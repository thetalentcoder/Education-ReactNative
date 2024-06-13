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
import { survivalLife } from "src/constants/consts";

import TickAnim from "src/parts/Question/TickAnim";
import CloseAnim from "src/parts/Question/CloseAnim";
import { sleep } from "src/utils/util";

import { quizModes } from "src/constants/consts";
import { getAllQuestions } from "src/actions/question/question";

type Props = {
    quizID: string,
    refresh: boolean,
    setCurrentProbNumber: (newValue: number) => void;
    setDataLoadedFlag: (newValue: boolean) => void;
    setCurrentLife: (newValue: number) => void;
    setCurrent: (newValue: number) => void;
    setTotalProbCount: (newValue: number) => void;
};

export default function SectionMainContent({
    quizID,
    refresh,
    setCurrentProbNumber,
    setDataLoadedFlag,
    setCurrentLife,
    setCurrent,
    setTotalProbCount
}: Props) {
    const navigation: any = useNavigation();

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

    const [limitTime, setLimitTime] = useState(1);
    const [remainTime, setRemainTime] = useState(1);

    const [tickShow, setTickShow] = useState(false);
    const [closeShow, setCloseShow] = useState(false);

    const [hideTick, setHideTick] = useState(true);
    const [hide, setHide] = useState(true);

    const scrollRef = useRef<ScrollView>(null);

    const timeLimitPerQuestion = 60000

    useFocusEffect(
        React.useCallback(() => {
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

            fetchQuizDetail();
        }, [quizID, refresh])
    );

    const fetchQuizDetail = useCallback(async () => {
        const data = await getAllQuestions(quizID);
        // await sleep(500);

        setQuizData(data);
        setDataLoaded(true);
        setDataLoadedFlag(true);
    }, [setQuizData, setDataLoaded, setDataLoadedFlag, quizID]);

    useEffect(() => {
        setProbCount(quizData?.questions?.length);
        setCurrentProb(currentProb)
    }, [quizData, currentProb]);

    useEffect(() => {
        if (dataLoaded && quizData.questions?.length) {
            setCurrentProbNumber(currentProb + 1);
            setTotalProbCount(probCount)

            setLimitTime(timeLimitPerQuestion);
            setRemainTime(timeLimitPerQuestion);

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
    }, [currentProb, dataLoaded, quizData]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (testEnded) {
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
    }, [remainTime, testEnded, dataLoaded]);


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

            const newScore: number = Math.floor(currentScore + (10 + remainTime / 1000) * life);
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
        if (currentProb + 1 == quizData?.questions?.length) {
            setTestEnded(true);
            navigation.navigate("Score", {
                id: quizID,
                submitData: submitData,
                score: currentScore,
                quizMode: quizModes.scenarioMode,
            });
        }

        setCurrentProb(currentProb + 1);

        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }, [navigation, setTestEnded, currentProb, currentScore, survivalLife, setCurrentProb]);


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
    }, [answers, setAnswers]);


    return (
        <View style={styles.container}>
            <TickAnim onTrigger={tickShow} setOnTrigger={setTickShow} hide={hideTick} setHide={setHideTick} CallBack={NextProb} />
            <CloseAnim onTrigger={closeShow} setOnTrigger={setCloseShow} hide={hide} setHide={setHide} CallBack={NextProb} />
            <View style={styles.timerContainer}>
                <AnimatedCircularProgress
                    size={verticalScale(90)}
                    width={verticalScale(4)}
                    fill={(limitTime - remainTime) * 100 / limitTime}
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
            <ScrollView style={styles.innerContainer} ref={scrollRef}>
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
                        text="NEXT"
                        type="rounded"
                        color="#FF675B"
                        enabled={!(hide && hideTick)}
                        onClick={NextProblem}
                    />
                </View>
            </ScrollView>
        </View>
    )
}