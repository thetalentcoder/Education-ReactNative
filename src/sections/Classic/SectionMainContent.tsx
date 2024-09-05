import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { PTFEButton } from "src/components/button";

import PartAnswer from "src/parts/Question/PartAnswer";
import styles from "./SectionMainContentStyle"

import { getQuizDataDetail } from "src/actions/quiz/quiz";
import { moderateScale, scale, verticalScale } from "src/config/scale";
import { PTFELoading } from "src/components/loading";
import { quiz_test_data } from "assets/@mockup/data";
import { gameModeString, survivalLife, timeLimitPerQuestion } from "src/constants/consts";

import TickAnim from "src/parts/Question/TickAnim";
import CloseAnim from "src/parts/Question/CloseAnim";
import { checkIfUserHastakenQuizToday, sleep } from "src/utils/util";

import { quizModes } from "src/constants/consts";
import { getAllQuestions } from "src/actions/question/question";
import { useSelector } from "react-redux";


type Props = {
    quizID: string[],
    refresh: boolean,
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

    const { user } = useSelector((state) => state.userData);

    const [submitData, setSubmitData] = useState<any[]>([]);

    const [life, setLife] = useState(survivalLife);

    const [quizData, setQuizData] = useState<any>({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [testEnded, setTestEnded] = useState(false);

    const [probCount, setProbCount] = useState(0);
    const [currentProb, setCurrentProb] = useState(0);
    const [passedQuestion, setPassedQuestionCount] = useState(0);

    const [currentScore, setCurrentScore] = useState(0);

    const [problem, setProblem] = useState<string>('');
    const [answers, setAnswers] = useState<any>([0, 0, 0, 0]);
    const [rationale, setRationale] = useState<string>('');

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
        setProblem('');
        setAnswers([0, 0, 0, 0]);
        setSelected(false);

        fetchQuizDetail();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
        }, [quizID, refresh])
    );

    const fetchQuizDetail = useCallback(async () => {
        const data = await getAllQuestions(quizID);
        // await sleep(500);

        setQuizData(data);
        setDataLoaded(true);
        setSubmitData([]);
        setDataLoadedFlag(true);
    }, [setQuizData, setDataLoaded, setSubmitData, setDataLoadedFlag, quizID]);

    useEffect(() => {
        setProbCount(quizData?.questions?.length);
        setCurrentProb(currentProb)
    }, [quizData, currentProb]);

    useEffect(() => {
        if (dataLoaded && quizData.questions?.length) {
            setCurrentProbNumber(currentProb + 1);
            setTotalProbCount(probCount)

            setRemainTime(timeLimitPerQuestion);
            setLimitTime(timeLimitPerQuestion);

            const currentQuestion = quizData.questions[currentProb];

            if (currentQuestion) {
                setProblem(currentQuestion.question);
                setRationale(currentQuestion.answerExplanation);
                if (currentQuestion.answers) {
                    const newAnswers = currentQuestion.answers.map((item: any, index: number) => {
                        return {
                            index: String.fromCharCode(0x41 + index),
                            content: item.answer,
                            enabled: false,
                            correct: item.correct,
                        };
                    });
                    setAnswers(newAnswers);
                }
            }
        }
    }, [currentProb, dataLoaded, quizData, setLimitTime, setRemainTime]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (paused || testEnded) {
                clearInterval(intervalId);
            }
            else {
                if (remainTime <= 0 && dataLoaded) {
                    NextProblem();
                }
                else {
                    setRemainTime(remainTime - 100);
                }
            }
        }, 100);

        return () => {
            clearInterval(intervalId);
        }
    }, [remainTime, testEnded, dataLoaded, paused]);

    useEffect(() => {
        setPaused(timerPaused);
    }, [timerPaused]);

    const NextProblem = useCallback(() => {
        updateSubmitData();

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
            setHide(false);
        }
        else {
            setTickShow(true);
            setHideTick(false);

            const newScore: number = Math.floor(
                currentScore + (100 + remainTime / 1000) * (user?.currentMultiplier == undefined ? 1 : user?.currentMultiplier));
            setCurrentScore(newScore);
            setCurrent(newScore);
        }
        // Update Submit Data End
    }, [answers, life, submitData, currentProb, probCount, navigation, setLife, setCurrentLife, setCurrentProb, setTestEnded]);

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
    }, [quizData, problem, rationale, currentProb, answers, submitData, setSubmitData]);

    const NextProb = useCallback(() => {
        if (currentProb + 1 >= quizData?.questions?.length) {
            setTestEnded(true);
            const keys = Object.keys(quizModes);
            const index = keys.indexOf('classicMode');
            const hasTakenQuizToday = checkIfUserHastakenQuizToday(user)

            if (hasTakenQuizToday) {
                navigation.navigate("Score", {
                    id: quizID,
                    submitData: submitData,
                    title: gameModeString[index],
                    score: currentScore,
                    quizMode: quizModes.classicMode,
                    numberOfQuestions: currentProb + 1,
                    category: "All Questions"
                });
            } else {
                navigation.navigate("CurrentStreak", {
                    id: quizID,
                    submitData: submitData,
                    title: gameModeString[index],
                    score: currentScore,
                    quizMode: quizModes.classicMode,
                    numberOfQuestions: currentProb + 1,
                    category: "All Questions"
                });
            }
        }
        else {
            setCurrentProb(currentProb + 1);
            setSelected(false);

            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }
    }, [navigation, setTestEnded, currentProb, currentScore, survivalLife, setCurrentProb, setSelected]);


    const onSelect = useCallback((idx: number) => {
        const newAnswers = answers.map((item: any, index: number) => {
            return (
                {
                    index: item.index,
                    content: item.content,
                    enabled: index == idx,
                    correct: item.correct,
                }
            )
        })
        setAnswers(newAnswers);
        setSelected(true);

        scrollRef.current?.scrollToEnd({
            animated: true,
        });
    }, [answers, setAnswers, setSelected]);


    return (
        <View style={styles.container}>
            <TickAnim onTrigger={tickShow} setOnTrigger={setTickShow} hide={hideTick} setHide={setHideTick} CallBack={NextProb} />
            <CloseAnim onTrigger={closeShow} setOnTrigger={setCloseShow} hide={hide} setHide={setHide} CallBack={NextProb} />
            <View style={styles.timerContainer}>
                <AnimatedCircularProgress
                    size={verticalScale(90)}
                    width={verticalScale(4)}
                    fill={limitTime != 0 ? (limitTime - remainTime) * 100 / limitTime : 0}
                    tintColor="#FFFFFFFF"
                    rotation={180}
                    backgroundColor="#87C6E8">
                    {
                        (fill) => (
                            <Entypo name="stopwatch" size={moderateScale(36)} color="#A1C2C8" />
                        )
                    }
                </AnimatedCircularProgress>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.quizContainer}>
                    <ScrollView>
                        <Text style={styles.questionText}>
                            {problem}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.answersContainer}>
                    {
                        answers.map((item: any, index: number) => {
                            return (
                                <PartAnswer
                                    key={index}
                                    index={item.index}
                                    content={item.content}
                                    enabled={item.enabled}
                                    clickable={hide && hideTick}
                                    onClick={() => onSelect(index)}
                                />
                            )
                        })
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <PTFEButton
                        text="Next"
                        type="rounded"
                        color="#FF675B"
                        enabled={!(hide && hideTick && selected)}
                        onClick={NextProblem}
                    />
                </View>
            </View>
        </View>
    )
}