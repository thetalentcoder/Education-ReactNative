import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { PTFEButton } from "src/components/button";

import PartAnswer from "src/parts/Question/PartAnswer";
import styles from "./SectionMainContentStyle";
import Toast from "react-native-simple-toast";

import { getQuizDataDetail } from "src/actions/quiz/quiz";
import { moderateScale, scale, verticalScale } from "src/config/scale";
import { PTFELoading } from "src/components/loading";
import { quiz_test_data } from "assets/@mockup/data";
import {
  gameModeString,
  survivalLife,
  timeLimitPerQuestion,
} from "src/constants/consts";

import TickAnim from "src/parts/Question/TickAnim";
import CloseAnim from "src/parts/Question/CloseAnim";
import { checkIfUserHastakenQuizToday, sleep } from "src/utils/util";

import { quizModes } from "src/constants/consts";
import { getAllQuestions } from "src/actions/question/question";
import { useSelector } from "react-redux";
import Confetti from "src/parts/Score/Confetti";

type Answer = {
  questionId: string;
  isCorrect: boolean;
};

type Props = {
  quizID: string[];
  refresh: boolean;
  setCurrentProbNumber: (newValue: number) => void;
  setDataLoadedFlag: (newValue: boolean) => void;
  setCurrentLife: (newValue: number) => void;
  setCurrent: (newValue: number) => void;
  timerPaused: boolean;
  scrollRef: any;
  previousBest: number;
};

export default function SectionMainContent({
  quizID,
  refresh,
  setCurrentProbNumber,
  setDataLoadedFlag,
  setCurrentLife,
  setCurrent,
  timerPaused,
  scrollRef,
  previousBest = 0,
}: Props) {
  const navigation: any = useNavigation();

  const { user } = useSelector((state: any) => state.userData);

  const [submitData, setSubmitData] = useState<any[]>([]);
  const [closeModalVisible, setCloseModalVisible] = useState(false);

  const [life, setLife] = useState(survivalLife);
  const [quizState, setQuizState] = useState(0);

  const [quizData, setQuizData] = useState<any>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [testEnded, setTestEnded] = useState(false);

  const [statistics, setStatistics] = useState<number>(0);

  const [submitAnswers, setSubmitAnswers] = useState<Answer[]>([]);

  const [probCount, setProbCount] = useState(0);
  const [currentProb, setCurrentProb] = useState(0);
  const [passedQuestion, setPassedQuestionCount] = useState(0);

  const [currentScore, setCurrentScore] = useState(0);

  const [problem, setProblem] = useState<string>("");
  const [answers, setAnswers] = useState<any>([0, 0, 0, 0]);
  const [rationale, setRationale] = useState<string>("");

  const [limitTime, setLimitTime] = useState(0);
  const [remainTime, setRemainTime] = useState(0);

  const [tickShow, setTickShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);

  const [hideTick, setHideTick] = useState(true);
  const [hide, setHide] = useState(true);

  const [selected, setSelected] = useState(false);
  const [statisticsFlag, setStatisticsFlag] = useState(false);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (quizID == undefined) {
      return;
    }

    setLife(survivalLife);

    setDataLoadedFlag(false);
    setSubmitData([]);
    setQuizData({});

    setDataLoaded(false);
    setTestEnded(false);

    setProbCount(0);
    setCurrentProb(0);
    setCurrentScore(0);
    setCurrent(0);
    setProblem("");
    setAnswers([0, 0, 0, 0]);
    setSelected(false);

    fetchQuizDetail();
  }, []);

  useFocusEffect(React.useCallback(() => {}, [quizID, refresh]));

  // useEffect(() => {
  //     switch (quizState) {
  //       case 2:
  //         scrollRef.current?.scrollToEnd({
  //           animated: true,
  //         });
  //         break;
  //       case 0:
  //         setHide(true);
  //         setHideTick(true);
  //         setSelected(false);
  //         break;
  //     }
  //   }, [quizState]);

  const goToSetting = useCallback(() => {
    navigation.navigate("SettingScreen");
  }, [navigation]);

  const fetchQuizDetail = useCallback(async () => {
    const data = await getAllQuestions(quizID);
    if (data.success == false) {
      Toast.show(
        "Your game is only available on paid accounts. Subscribe to your account",
        5000
      );
      goToSetting();
    }
    // await sleep(500);

    const statistics = data.questions[currentProb]?.statistics;
    if (statistics) {
      const totalCorrect = statistics.totalCorrect || 0;
      const totalAnswered = statistics.totalAnswered || 1;
      const percentageCorrect = (totalCorrect / totalAnswered) * 100;
      setStatistics(Math.round(percentageCorrect));
    }

    setQuizData(data);
    setDataLoaded(true);
    setDataLoadedFlag(true);
  }, [setQuizData, setDataLoaded, setDataLoadedFlag, quizID]);

  const fetchMoreQuestions = useCallback(async () => {
    const data = await getAllQuestions(quizID);
    if (data.success == false) {
      Toast.show(
        "Your game is only available on paid accounts. Subscribe to your account",
        5000
      );
      goToSetting();
    }
    setQuizData((prevData: any) => {
      return {
        ...prevData,
        questions: [...prevData.questions, ...data.questions],
      };
    });
    setDataLoaded(true);
    setDataLoadedFlag(true);
  }, [setQuizData, setDataLoaded, setDataLoadedFlag, quizID]);

  useEffect(() => {
    setProbCount(quizData?.totalQuestions);
    // setCurrentProb(currentProb)
  }, [quizData]);

  useEffect(() => {
    if (dataLoaded && quizData.questions?.length) {
      setCurrentProbNumber(currentProb + 1);

      setLimitTime(timeLimitPerQuestion);
      setRemainTime(timeLimitPerQuestion);

      const currentQuestion = quizData.questions[currentProb + 1];
      const statistics = quizData.questions[currentProb + 1]?.statistics;
      if (statistics) {
        const totalCorrect = statistics.totalCorrect || 0;
        const totalAnswered = statistics.totalAnswered || 1;
        const percentageCorrect = (totalCorrect / totalAnswered) * 100;
        setStatistics(Math.round(percentageCorrect));
      }

      if (currentQuestion) {
        setProblem(currentQuestion.question);
        setRationale(currentQuestion.answerExplanation);
        if (currentQuestion.answers) {
          const newAnswers = currentQuestion.answers.map(
            (item: any, index: number) => {
              return {
                index: String.fromCharCode(0x41 + index),
                content: item.answer,
                enabled: false,
                correct: item.correct,
              };
            }
          );
          setAnswers(newAnswers);
        }
      }
    }
  }, [currentProb, dataLoaded, quizData]);

  useEffect(() => {
    if (previousBest == currentProb && currentProb != 0) {
      setCloseModalVisible(true);
      setPaused(true);
    }
  }, [currentProb]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (paused || testEnded) {
        clearInterval(intervalId);
      } else {
        if (remainTime <= 0 && dataLoaded) {
          goSubmit();
          NextClicked()
        } else {
          setRemainTime(remainTime - 100);
        }
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [remainTime, testEnded, dataLoaded, paused]);

  useEffect(() => {
    setPaused(timerPaused);
  }, [timerPaused]);

  const updateSubmitData = useCallback(() => {
    let data = submitData;
    let newItem = {
      question: problem,
      answers: "",
      answerExplanation: rationale,
    };
    newItem.answers = answers;
    data.push(newItem);
    setSubmitData(data);
  }, [
    quizData,
    problem,
    rationale,
    currentProb,
    answers,
    submitData,
    setSubmitData,
  ]);

  const goSubmit = () => {
    setStatisticsFlag(true);
    if (quizState == 0) {
      {
        // Update Submit Data Start
        let isPassed = false;
        for (const answer of answers) {
          if (answer.enabled == true && answer.correct == true) {
            setPassedQuestionCount(passedQuestion + 1);
            isPassed = true;
          }
        }

        if (!isPassed) {
          setCurrentLife(life - 1);
          setLife(life - 1);
          setCloseShow(true);
          // setHide(false);
        } else {
          // setTickShow(true);
          // setHideTick(false);

          const newScore: number = Math.floor(
            currentScore +
              (100 + remainTime / 1000 + life * 10) *
                (user?.currentMultiplier == undefined
                  ? 1
                  : user?.currentMultiplier)
          );
          setCurrentScore(newScore);
          setCurrent(newScore);
        }

        if (currentProb + 2 >= quizData?.questions?.length) {
          fetchMoreQuestions();
        }
        setQuizState(2);
      }
    }
  };

  const goNext = () => {
    if (quizState) NextClicked();
  };

  const NextClicked = useCallback(() => {
    setStatisticsFlag(false);
    updateSubmitData();
    setQuizState(0);
    if (life <= 0) {
      setTestEnded(true);
      const keys = Object.keys(quizModes);
      const index = keys.indexOf("survivorMode");
      const hasTakenQuizToday = checkIfUserHastakenQuizToday(user);

      console.log(
        "XXsubmition--",
        JSON.stringify({
          id: quizID,
          submitData: submitData,
          title: gameModeString[index],
          score: currentScore,
          quizMode: quizModes.survivorMode,
          numberOfQuestions: currentProb + 1,
          category: "All Questions",
        })
      );
      if (hasTakenQuizToday) {
        navigation.navigate("Score", {
          id: quizID,
          submitData: submitData,
          title: gameModeString[index],
          score: currentScore,
          quizMode: quizModes.survivorMode,
          numberOfQuestions: currentProb + 1,
          answers: submitAnswers,
        });
      } else {
        navigation.navigate("CurrentStreak", {
          id: quizID,
          submitData: submitData,
          title: gameModeString[index],
          score: currentScore,
          quizMode: quizModes.survivorMode,
          numberOfQuestions: currentProb + 1,
          answers: submitAnswers,
        });
      }
    } else {
      setCurrentProb(currentProb + 1);
      setSelected(false);

      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  }, [
    life,
    navigation,
    setTestEnded,
    currentProb,
    currentScore,
    survivalLife,
    setCurrentProb,
    setSelected,
  ]);

  const onSelect = useCallback(
    (idx: number) => {
      const incrementMatch = answers[idx].correct === true ? 1 : 0;

      const id = quizData.questions[currentProb + 1]?._id;
      const unitAnswer = {
        questionId: id,
        isCorrect: incrementMatch === 1,
      };

      setSubmitAnswers([...submitAnswers, unitAnswer]);

      const newAnswers = answers.map((item: any, index: number) => {
        return {
          index: item.index,
          content: item.content,
          enabled: index == idx,
          correct: item.correct,
        };
      });
      setAnswers(newAnswers);
      setSelected(true);

      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    },
    [answers, setAnswers, setSelected]
  );

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <AnimatedCircularProgress
          size={verticalScale(90)}
          width={verticalScale(8)}
          fill={
            limitTime != 0 ? ((limitTime - remainTime) * 100) / limitTime : 0
          }
          tintColor="#FFFFFFFF"
          rotation={180}
          backgroundColor={
            ((limitTime - remainTime) * 100) / limitTime >= 75
              ? "#F75959FF"
              : "#87C6E8"
          }
          // backgroundColor="#87C6E8"
        >
          {(fill) => (
            <Entypo name="stopwatch" size={moderateScale(36)} color="#A1C2C8" />
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.quizContainer}>
          <ScrollView>
            <Text style={styles.questionText}>
              {problem.replace(/\n/g, "").trim()}
            </Text>
            {/* <View style={styles.videoWrapper}>
              <View style={styles.vimeoVideoContainer}></View>
            </View>
            <View style={styles.photoContainer}></View> */}
          </ScrollView>
        </View>
        {statisticsFlag && (
          <View style={styles.statisticsContainer}>
            <Text style={styles.statisticsText}>
              {statistics} % of users answer this question correctly
            </Text>
          </View>
        )}
        <View style={styles.answersContainer}>
          {answers.map((item: any, index: number) => {
            return (
              <>
                {quizState == 0 ? (
                  <PartAnswer
                    key={index}
                    index={item.index}
                    content={item.content}
                    enabled={item.enabled}
                    clickable={hide && hideTick}
                    onClick={() => onSelect(index)}
                  />
                ) : (
                  <PartAnswer
                    key={index}
                    index={item.index}
                    content={item.content}
                    enabled={item.enabled}
                    correct={item.correct}
                    mine={item.enabled}
                    clickable={false}
                    onClick={() => onSelect(index)}
                  />
                )}
              </>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          {quizState == 2 ? (
            <PTFEButton
              text={"Next"}
              type={"rounded"}
              color="#FF675B"
              enabled={!selected}
              onClick={goNext}
            />
          ) : (
            <PTFEButton
              text={"Submit"}
              type={"rounded"}
              color="#FF675B"
              enabled={!selected}
              onClick={goSubmit}
            />
          )}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={closeModalVisible}
        onRequestClose={() => {
          setPaused(false);
          setCloseModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: moderateScale(22),
                fontFamily: "circular-std-black",
                textAlign: "center",
                paddingBottom: verticalScale(16),
              }}
            >
              {`Congratulations!`}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(18),
                fontFamily: "circular-std-medium",
                textAlign: "center",
                paddingBottom: verticalScale(10),
                paddingHorizontal: scale(10),
              }}
            >
              {`You beat your previous best record of ${previousBest}. `}
              {`Your new record is ${previousBest + 1} and climbing!`}
            </Text>
            <View style={styles.space1}>
              <PTFEButton
                text={"CLOSE"}
                type="rounded"
                color="#FF675B"
                height={scale(48)}
                onClick={() => {
                  setCloseModalVisible(false);
                  setPaused(false);
                }}
              />
            </View>
          </View>
          <Confetti />
        </View>
      </Modal>
    </View>
  );
}
