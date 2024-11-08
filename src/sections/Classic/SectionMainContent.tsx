import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { PTFEButton } from "src/components/button";
import Toast from "react-native-simple-toast";

import PartAnswer from "src/parts/Question/PartAnswer";
import styles from "./SectionMainContentStyle";

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
  setTotalProbCount: (newValue: number) => void;
  timerPaused: boolean;
  scrollRef: any;
};

export default function SectionMainContent({
  quizID,
  refresh,
  setCurrentProbNumber,
  setDataLoadedFlag,
  setCurrentLife,
  setCurrent,
  setTotalProbCount,
  timerPaused,
  scrollRef,
}: Props) {
  const navigation: any = useNavigation();

  const { user } = useSelector((state: any) => state.userData);

  const [submitData, setSubmitData] = useState<any[]>([]);

  const [life, setLife] = useState(survivalLife);
  const [quizState, setQuizState] = useState(0);

  const [quizData, setQuizData] = useState<any>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [testEnded, setTestEnded] = useState(false);

  const [probCount, setProbCount] = useState(0);
  const [currentProb, setCurrentProb] = useState(0);
  const [passedQuestion, setPassedQuestionCount] = useState(0);

  const [currentScore, setCurrentScore] = useState(0);

  const [statistics, setStatistics] = useState<number>(0);

  const [submitAnswers, setSubmitAnswers] = useState<Answer[]>([]);

  const [problem, setProblem] = useState<string>("");
  const [answers, setAnswers] = useState<any>([0, 0, 0, 0]);
  const [rationale, setRationale] = useState<string>("");
  const [statisticsFlag, setStatisticsFlag] = useState(false);

  const [limitTime, setLimitTime] = useState(0);
  const [remainTime, setRemainTime] = useState(0);

  const [tickShow, setTickShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);

  const [hideTick, setHideTick] = useState(true);
  const [hide, setHide] = useState(true);

  const [selected, setSelected] = useState(false);

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

  const goToSetting = useCallback(() => {
    console.log("Navigating to SettingScreen");
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
      if (Math.round(percentageCorrect) == 0) {
        setStatistics(Math.floor(Math.random() * (90 - 70 + 1)) + 70)
      } else {
        setStatistics(Math.round(percentageCorrect));
      }     
    }
    setQuizData(data);
    setDataLoaded(true);
    setSubmitData([]);
    setDataLoadedFlag(true);
  }, [setQuizData, setDataLoaded, setSubmitData, setDataLoadedFlag, quizID]);

  useEffect(() => {
    setProbCount(quizData?.questions?.length);
    setCurrentProb(currentProb);
  }, [quizData, currentProb]);

  useEffect(() => {
    if (dataLoaded && quizData.questions?.length) {
      setCurrentProbNumber(currentProb + 1);
      setTotalProbCount(probCount);

      setRemainTime(timeLimitPerQuestion);
      setLimitTime(timeLimitPerQuestion);

      const currentQuestion = quizData.questions[currentProb];
      const statistics = quizData.questions[currentProb + 1]?.statistics;
      if (statistics) {
        const totalCorrect = statistics.totalCorrect || 0;
        const totalAnswered = statistics.totalAnswered || 1;
        const percentageCorrect = (totalCorrect / totalAnswered) * 100;
        if (Math.round(percentageCorrect) == 0) {
          setStatistics(Math.floor(Math.random() * (90 - 70 + 1)) + 70)
        } else {
          setStatistics(Math.round(percentageCorrect));
        }     
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
  }, [currentProb, dataLoaded, quizData, setLimitTime, setRemainTime]);

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

  const goSubmit = useCallback(() => {
    updateSubmitData();
    setStatisticsFlag(true);

    if (quizState == 0) {
      // Update Submit Data Start
      let isPassed = false;
      for (const answer of answers) {
        if (answer.enabled == true && answer.correct == true) {
          setPassedQuestionCount(passedQuestion + 1);
          isPassed = true;
        }
      }

      if (!isPassed) {
        setCloseShow(true);
        // setHide(false);
      } else {
        // setTickShow(true);
        // setHideTick(false);

        const newScore: number = Math.floor(
          currentScore +
            (100 + remainTime / 1000) *
              (user?.currentMultiplier == undefined
                ? 1
                : user?.currentMultiplier)
        );
        setCurrentScore(newScore);
        setCurrent(newScore);
      }
      setQuizState(2);
    }
    // Update Submit Data End
  }, [
    answers,
    life,
    submitData,
    currentProb,
    probCount,
    navigation,
    setLife,
    setCurrentLife,
    setCurrentProb,
    setTestEnded,
  ]);

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
  // const updateSubmitData = useCallback(() => {
  //   // Check if the current question has already been saved
  //   const existingIndex = submitData.findIndex((item) => item.question === problem);
    
  //   if (existingIndex === -1) { // If not already saved, add it
  //     const newItem = {
  //       question: problem,
  //       answers: answers.map((answer: { index: any; content: any; enabled: any; correct: any; }) => ({
  //         index: answer.index,
  //         content: answer.content,
  //         enabled: answer.enabled,
  //         correct: answer.correct,
  //       })),
  //       answerExplanation: rationale,
  //     };
  
  //     setSubmitData((prevData) => [...prevData, newItem]);
  //   }
  // }, [problem, answers, rationale, submitData]);
  

  const goNext = () => {
    if (quizState) NextClicked();
  };

  const NextClicked = useCallback(() => {
    setStatisticsFlag(false);
    // updateSubmitData();
    setQuizState(0);
    if (currentProb + 1 >= quizData?.questions?.length) {
      setTestEnded(true);
      const keys = Object.keys(quizModes);
      const index = keys.indexOf("classicMode");
      const hasTakenQuizToday = checkIfUserHastakenQuizToday(user);

      if (hasTakenQuizToday) {
        navigation.navigate("Score", {
          id: quizID,
          submitData: submitData,
          title: gameModeString[index],
          score: currentScore,
          quizMode: quizModes.classicMode,
          numberOfQuestions: currentProb + 1,
          answers: submitAnswers,
        });
      } else {
        navigation.navigate("CurrentStreak", {
          id: quizID,
          submitData: submitData,
          title: gameModeString[index],
          score: currentScore,
          quizMode: quizModes.classicMode,
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
          backgroundColor="#87C6E8"
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
    </View>
  );
}
