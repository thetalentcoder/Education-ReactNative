import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Video, ResizeMode } from "expo-av";
import Toast from "react-native-simple-toast";

import { PTFEButton, PTFELinkButton } from "src/components/button";

import PartAnswer from "src/parts/Study/PartAnswer";
import styles from "./SectionMainContentStyle";

import { getQuizDataDetail } from "src/actions/quiz/quiz";
import { moderateScale, scale, verticalScale } from "src/config/scale";
import { PTFELoading } from "src/components/loading";

import TickAnim from "src/parts/Question/TickAnim";
import CloseAnim from "src/parts/Question/CloseAnim";
import { quizModes } from "src/constants/consts";
import { quiz_test_data } from "assets/@mockup/data";
import { checkIfUserHastakenQuizToday, sleep } from "src/utils/util";
import { getAllQuestions } from "src/actions/question/question";
import { useSelector } from "react-redux";

type Props = {
  quizID: string[];
  numberOfQuestions: number;
  refresh: boolean;
  nextQuestion: boolean;
  setCurrentProbNumber: (newValue: number) => void;
  setTotalProbCount: (newValue: number) => void;
  setDataLoadedFlag: (newValue: boolean) => void;
  setCurrent: (newValue: number) => void;
  topics?: string[];
  scrollRef: any;
  setCurrentQuizState: (newValue: number) => void;
};

type Answer = {
  questionId: string;
  isCorrect: boolean;
};

export default function SectionMainContent({
  quizID,
  numberOfQuestions,
  refresh,
  nextQuestion,
  setCurrentProbNumber,
  setTotalProbCount,
  setDataLoadedFlag,
  setCurrent,
  topics = [],
  scrollRef,
  setCurrentQuizState,
}: Props) {
  const navigation: any = useNavigation();

  const { user } = useSelector((state: any) => state.userData);
  const [status, setStatus] = useState({});
  const player = React.useRef(null);
  const [submitData, setSubmitData] = useState<any[]>([]);

  const [quizState, setQuizState] = useState(0);

  const [quizData, setQuizData] = useState<any>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [testEnded, setTestEnded] = useState(false);

  const [probCount, setProbCount] = useState(0);
  const [currentProb, setCurrentProb] = useState(0);
  const [missesProbs, setMissedProbs] = useState(0);

  const [currentScore, setCurrentScore] = useState(0);

  const [problem, setProblem] = useState<string>("");

  const [statistics, setStatistics] = useState<number>(0);

  const [submitAnswers, setSubmitAnswers] = useState<Answer[]>([]);

  const [answers, setAnswers] = useState<any>([0, 0, 0, 0]);
  const [rationale, setRationale] = useState<string>("");

  const [tickShow, setTickShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);

  const [hideTick, setHideTick] = useState(true);
  const [hide, setHide] = useState(true);

  const [selected, setSelected] = useState(false);
  const [update, forceUpdate] = useState(0);

  const [next, setNext] = useState(false);

  const [statisticsFlag, setStatisticsFlag] = useState(false);

  let [matchedCount, setMatchedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(1);

  useFocusEffect(
    React.useCallback(() => {
      if (next != true) setNext(true);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log("Next Question: " + nextQuestion);
      console.log("Current Prob: " + currentProb);
      console.log("Current Next: " + next);
      setTimeout(() => {
        if (nextQuestion == true && next == true) {
          setNext(false);
          NextProb();
        }
      }, 100);
    }, [nextQuestion, currentProb, next])
  );

  useEffect(() => {
    console.log(refresh);

    if (quizID == undefined) {
      return;
    }

    if (refresh == false) {
      return;
    }

    setSubmitData([]);
    setQuizData({});
    setDataLoaded(false);
    setDataLoadedFlag(false);
    setTestEnded(false);
    setProbCount(0);
    setCurrentProb(0);
    setCurrentScore(0);
    setCurrent(0);
    setQuizState(0);
    setProblem("");
    setRationale("");
    setAnswers([0, 0, 0, 0]);
    setSelected(false);

    fetchQuizDetail();
  }, []);

  useFocusEffect(React.useCallback(() => {}, [quizID, refresh]));

  const goToSetting = useCallback(() => {
    navigation.navigate("SettingScreen");
  }, [navigation]);

  const fetchQuizDetail = useCallback(async () => {
    const data = await getAllQuestions(
      quizID,
      1,
      numberOfQuestions > 0 ? numberOfQuestions : 20
    );
    if (data.success == false) {
      Toast.show(
        "Your game is only available on paid accounts. Subscribe to your account",
        5000
      );
      goToSetting()
    }
    // await sleep(500);
    console.log("XXLoaded", JSON.stringify(data));

    setQuizData(data);
    // setProblem(data.questions[currentProb + 1]?.question);
    // const statistics = data.questions[currentProb]?.statistics;
    // if (statistics) {
    //   const totalCorrect = statistics.totalCorrect || 0;
    //   const totalAnswered = statistics.totalAnswered || 1;
    //   const percentageCorrect = (totalCorrect / totalAnswered) * 100;
    //   setStatistics(Math.round(percentageCorrect));
    // }
    // setRationale(data.questions[currentProb]?.answerExplanation);
    // if (data.questions[currentProb]?.answers) {
    //   const newAnswers = data.questions[currentProb]?.answers.map(
    //     (item: any, index: number) => {
    //       return {
    //         index: String.fromCharCode(0x41 + index),
    //         content: item.answer,
    //         enabled: false,
    //         correct: item.correct,
    //       };
    //     }
    //   );
    //   setAnswers(newAnswers);
    // }
    setDataLoaded(true);
    setDataLoadedFlag(true);
  }, [setDataLoaded, quizID]);

  useEffect(() => {
    setProbCount(quizData?.questions?.length);
    setCurrentProb(0);
    setSubmitData([]);
  }, [quizData]);

  useEffect(() => {
    switch (quizState) {
      case 2:
        scrollRef.current?.scrollToEnd({
          animated: true,
        });
        break;
      case 1:
        setHide(true);
        setHideTick(true);
        // showCorrectAnswer();
        // forceUpdate(1 - update);
        setQuizState(2);
        setCurrentQuizState(2);
        break;
      case 0:
        setSelected(false);
        break;
    }
  }, [quizState]);

  useEffect(() => {
    if (dataLoaded && quizData) {
      setCurrentProbNumber(currentProb + 1);
      setTotalProbCount(probCount);
      const currentQuestion = quizData.questions[currentProb];
      // if (currentQuestion) {
      //   setProblem(currentQuestion.question);
      // }
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
  }, [currentProb, dataLoaded, quizData]);

  // const showCorrectAnswer = useCallback(() => {
  //   // console.log("Show Correct Answer");
  // }, []);

  const ToExplainPage = useCallback(() => {
    navigation.navigate("Explain", {
      answers: answers,
      currentScore: currentScore,
      currentProb: currentProb + 1,
      totalProbCount: probCount,
      rationale: rationale,
      topics: topics,
    });
  }, [answers, rationale, currentProb, probCount, currentScore, navigation]);

  const NextProblem = useCallback(() => {
    setStatisticsFlag(true);
    switch (quizState) {
      case 0:
        {
          updateSubmitData();
          let isPassed = false;
          for (const answer of answers) {
            if (answer.enabled == true && answer.correct == true) {
              isPassed = true;
            }
          }

          if (!isPassed) {
            setCloseShow(true);
            setHide(false);
            setMissedProbs(missesProbs + 1);
          } else {
            setTickShow(true);
            setHideTick(false);

            setCurrentScore(currentScore + 1);
            setCurrent(currentScore + 1);
          }
        }
        break;
      case 2:
        NextProb();
        break;
    }
  }, [
    quizState,
    answers,
    submitData,
    currentProb,
    probCount,
    navigation,
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

    // if (quizData.questions[currentProb]?.answers) {
    //   const newAnswers = quizData.questions[currentProb]?.answers.map(
    //     (item: any, index: number) => {
    //       console.log("##item.enabled", item.enabled);
    //       return {
    //         index: String.fromCharCode(0x41 + index),
    //         content: item.answer,
    //         enabled: item.enabled,
    //         // enabled: false,
    //         correct: item.correct,
    //       };
    //     }
    //   );
    //   let newItem = {
    //     question: quizData.questions[currentProb]?.question,
    //     answers: newAnswers,
    //     answerExplanation: quizData.questions[currentProb]?.answerExplanation,
    //   };
    //   data.push(newItem);
    //   setSubmitData(data);
    // }
  }, [
    quizData,
    problem,
    rationale,
    currentProb,
    answers,
    submitData,
    setSubmitData,
  ]);

  const onSelect = useCallback(
    (idx: number) => {
      console.log("##SELECTED", idx);

      setTotalCount((prev) => prev + 1);

      const incrementMatch = answers[idx].correct === true ? 1 : 0;
      setMatchedCount((prev) => prev + incrementMatch);

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
          enabled: index === idx,
          correct: item.correct,
        };
      });

      console.log("##setp data", matchedCount); // This might still log the old matchedCount due to closure
      setAnswers(newAnswers);
      setSelected(true);

      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    },
    [answers, setAnswers, setSelected, setMatchedCount, scrollRef]
  );

  const NextProb = useCallback(() => {
    setStatisticsFlag(false);
    
    setQuizState(0);
    setCurrentQuizState(0);
    if (currentProb >= probCount - 1) {
      const hasTakenQuizToday = checkIfUserHastakenQuizToday(user);
      setTestEnded(true);

      console.log("##XX", submitAnswers);
      if (hasTakenQuizToday) {
        navigation.navigate("Score", {
          id: quizID,
          title: "Study Mode",
          submitData: submitData,
          score: currentScore,
          quizMode: quizModes.studyMode,
          matchedCount: matchedCount,
          totalCount: totalCount,
          answers: submitAnswers,
        });
      } else {
        navigation.navigate("CurrentStreak", {
          id: quizID,
          title: "Study Mode",
          submitData: submitData,
          score: currentScore,
          quizMode: quizModes.studyMode,
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
    currentProb,
    probCount,
    submitData,
    currentScore,
    setTestEnded,
    setCurrentProb,
  ]);

  return (
    <View style={styles.container}>
      <TickAnim
        onTrigger={tickShow}
        setOnTrigger={setTickShow}
        hide={hideTick}
        setHide={setHideTick}
        CallBack={() => {
          setQuizState(1);
          setCurrentQuizState(1);
        }}
      />
      <CloseAnim
        onTrigger={closeShow}
        setOnTrigger={setCloseShow}
        hide={hide}
        setHide={setHide}
        CallBack={() => {
          setQuizState(1);
          setCurrentQuizState(1);
        }}
      />
      <View style={styles.innerContainer}>
        <View style={styles.quizContainer}>
          <Text style={styles.questionText}>{problem.replace(/\n/g, '').trim()}</Text>
          {/* <View style={styles.videoWrapper}>
            <View style={styles.vimeoVideoContainer}>
              {videoUrl && (
                <Video
                  ref={player}
                  style={styles.video}
                  source={{
                    uri: videoUrl,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              )}
            </View>
          </View>
          <View style={styles.photoContainer}></View> */}
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
            console.log("xxanswers::", JSON.stringify(problem));
            return (
              <>
                {quizState == 0 || quizState == 1 ? (
                  <PartAnswer
                    key={index}
                    index={item.index}
                    content={item.content}
                    enabled={selected ? item.enabled : false}
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
          <View style={{ padding: verticalScale(4) }}></View>
          <View style={styles.buttonContainer}>
            <PTFEButton
              text={quizState == 2 ? "Next" : "Submit"}
              type={"rounded"}
              color="#FF675B"
              enabled={!(hide && hideTick && selected)}
              onClick={NextProblem}
            />

            {quizState == 2 && (
              <PTFEButton
                text={"View Explanation"}
                type="rounded"
                color="#87C6E8"
                onClick={ToExplainPage}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
