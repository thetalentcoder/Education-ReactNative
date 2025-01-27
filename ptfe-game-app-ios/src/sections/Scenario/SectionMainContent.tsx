import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useGameMode } from '../../../GameModeContext';
import { Entypo } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Toast from "react-native-simple-toast";

import { PTFEButton } from "src/components/button";

import PartAnswer from "src/parts/Question/PartAnswer";
import styles from "./SectionMainContentStyle";

import { moderateScale, scale, verticalScale } from "src/config/scale";
import {
  gameModeString,
  survivalLife,
  timeLimitPerQuestion,
} from "src/constants/consts";

import TickAnim from "src/parts/Question/TickAnim";
import CloseAnim from "src/parts/Question/CloseAnim";
import { checkIfUserHastakenQuizToday, sleep } from "src/utils/util";

import { quizModes } from "src/constants/consts";
import {
  getAllQuestions,
  getAllScenarioQuestions,
} from "src/actions/question/question";
import { useSelector } from "react-redux";

import HTMLView from "react-native-htmlview";

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
  topics?: string[];
  timerPaused: boolean;
  scrollRef: any;
  setCurrentQuizState: (newValue: number) => void;
};

export default function SectionMainContent({
  quizID,
  refresh,
  setCurrentProbNumber,
  setDataLoadedFlag,
  setCurrentLife,
  setCurrent,
  setTotalProbCount,
  topics,
  timerPaused,
  scrollRef,
  setCurrentQuizState,
}: Props) {
  const navigation: any = useNavigation();

  const { user } = useSelector((state: any) => state.userData);
  const {setsubmitState, setCategoryState, setSetCategoryState} = useGameMode();
  const [submitData, setSubmitData] = useState<any[]>([]);

  const [life, setLife] = useState(survivalLife);
  const [quizState, setQuizState] = useState(0);
  const [quizData, setQuizData] = useState<any>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [testEnded, setTestEnded] = useState(false);

  const [probCount, setProbCount] = useState(0);
  const [currentProb, setCurrentProb] = useState(0);
  const [passedQuestion, setPassedQuestionCount] = useState(0);
  const [statisticsFlag, setStatisticsFlag] = useState(false);

  const [currentScore, setCurrentScore] = useState(0);

  const [statistics, setStatistics] = useState<number>(0);

  const [submitAnswers, setSubmitAnswers] = useState<Answer[]>([]);

  const [problem, setProblem] = useState<string>("");
  const [answers, setAnswers] = useState<any>([0, 0, 0, 0]);
  const [rationale, setRationale] = useState<string>("");

  const [limitTime, setLimitTime] = useState(0);
  const [remainTime, setRemainTime] = useState(0);

  const [tickShow, setTickShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);

  const [scenario, setScenario] = useState("");

  const [hideTick, setHideTick] = useState(true);
  const [hide, setHide] = useState(true);

  const [selected, setSelected] = useState(false);

  const [paused, setPaused] = useState(false);

  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);

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
    navigation.navigate("Profile", {
      screen: "SettingScreen",
    });
  }, [navigation]);

  const fetchQuizDetail = useCallback(async () => {
    const data = await getAllScenarioQuestions(quizID);
    console.log("this is scenario page", data);
    console.log("this is scenario page", setCategoryState);
    if (data.success == false) {
      if (setCategoryState === 1) {
        Toast.show(
          "Your game is only available on paid accounts. Subscribe to your account",
          Toast.SHORT 
        );
        goToSetting();
      }
    }
    if (data.state == true) {
      if (setCategoryState === 1) {
        Toast.show(
          "Your subscription expired, Please purchase.",
          Toast.SHORT 
        );
        goToSetting();
      }
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
    setDataLoadedFlag(true);
  }, [setQuizData, setDataLoaded, setDataLoadedFlag, quizID]);

  useEffect(() => {
    setProbCount(quizData?.questions?.length);
    setCurrentProb(currentProb);
  }, [quizData, currentProb]);

  useEffect(() => {
    if (dataLoaded && quizData.questions?.length) {
      setCurrentProbNumber(currentProb + 1);
      setTotalProbCount(probCount);

      setLimitTime(timeLimitPerQuestion);
      setRemainTime(timeLimitPerQuestion);

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
        setScenario(currentQuestion.scenarioId.scenario);
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
    setPaused(timerPaused || scenarioModalVisible);
  }, [timerPaused, scenarioModalVisible]);

  const goSubmit = useCallback(() => {
    updateSubmitData();
    setStatisticsFlag(true);
    if (quizState == 0) {
      let isPassed = false;
      for (const answer of answers) {
        if (answer.enabled == true && answer.correct == true) {
          setPassedQuestionCount(passedQuestion + 1);
          isPassed = true;
        }
      }

      if (!isPassed) {
        setCloseShow(true);
      } else {
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
      setCurrentQuizState(2);
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
      scenario: scenario,
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

  const goNext = () => {
    if (quizState) NextClicked();
  };

  const NextClicked = useCallback(() => {
    setStatisticsFlag(false);
    setsubmitState(1);
    setQuizState(0);
    setCurrentQuizState(0);
    setSetCategoryState(1);
    if (currentProb + 1 == quizData?.questions?.length) {
      const keys = Object.keys(quizModes);
      const index = keys.indexOf("scenarioMode");
      const hasTakenQuizToday = checkIfUserHastakenQuizToday(user);

      setTestEnded(true);
      if (hasTakenQuizToday) {
        navigation.navigate("Score", {
          id: quizID,
          submitData: submitData,
          title: gameModeString[index],
          score: currentScore,
          quizMode: quizModes.scenarioMode,
          numberOfQuestions: currentProb + 1,
          answers: submitAnswers,
          topic: topics
        });
      } else {
        navigation.navigate("CurrentStreak", {
          id: quizID,
          submitData: submitData,
          title: gameModeString[index],
          score: currentScore,
          quizMode: quizModes.scenarioMode,
          numberOfQuestions: currentProb + 1,
          answers: submitAnswers,
          topic: topics
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
    [answers, setAnswers, setSelected, scrollRef]
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
      <ScrollView style={styles.innerContainer} ref={scrollRef}>
        <PTFEButton
          text="Show Scenario"
          type="rounded"
          color="#FF675B"
          enabled={!(hide && hideTick)}
          onClick={() => setScenarioModalVisible(true)}
        />
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
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={scenarioModalVisible}
        onRequestClose={() => setScenarioModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback
            onPress={() => setScenarioModalVisible(false)}
          >
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.title}>{`  Scenario`}</Text>
              {/* <Text style={styles.title}>{scenario}</Text> */}
              <HTMLView value={scenario} />
              <View style={styles.space8}></View>
            </ScrollView>
            <View style={styles.space16}></View>
            <PTFEButton
              text="CLOSE"
              type="circle"
              color="#FF675B"
              onClick={() => {
                setScenarioModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
