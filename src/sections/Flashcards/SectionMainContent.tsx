import React, { useCallback, useEffect, useState, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";


import { PTFEButton } from "src/components/button";

import PartAnswer from "src/parts/Study/PartAnswer";
import styles from "./SectionMainContentStyle"

import { moderateScale, scale, verticalScale } from "src/config/scale";

import TickAnim from "src/parts/Question/TickAnim";
import CloseAnim from "src/parts/Question/CloseAnim";
import { quizModes } from "src/constants/consts";
import { getAllQuestions } from "src/actions/question/question";
import { getFlashCard, } from "src/actions/flashcard/flashcard";

type Props = {
    quizID: any,
    refresh: boolean,
    setCurrentProbNumber: (newValue: number) => void;
    setTotalProbCount: (newValue: number) => void;
    setDataLoadedFlag: (newValue: boolean) => void;
    setCurrent: (newValue: number) => void;
    topics?: string;
    isCustomeFlashCardQuiz: boolean
};

export default function SectionMainContent({
    quizID,
    refresh,
    setCurrentProbNumber,
    setTotalProbCount,
    setDataLoadedFlag,
    setCurrent,
    topics = "",
    isCustomeFlashCardQuiz
}: Props) {
    const navigation: any = useNavigation();

    const [quizState, setQuizState] = useState(0);

    const [quizData, setQuizData] = useState<any>({});
    const [dataLoaded, setDataLoaded] = useState(false);

    const [probCount, setProbCount] = useState(0);
    const [currentProb, setCurrentProb] = useState(0);


    const [problem, setProblem] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [answers, setAnswers] = useState<any>([0, 0, 0, 0]);
    const [rationale, setRationale] = useState<string>('');

    const [tickShow, setTickShow] = useState(false);
    const [closeShow, setCloseShow] = useState(false);

    const [hideTick, setHideTick] = useState(true);
    const [hide, setHide] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);

    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        console.log(isCustomeFlashCardQuiz);

        if (quizID == undefined) {
            return;
        }

        if (refresh == false) {
            return;
        }

        setQuizData({});
        setDataLoaded(false);
        setDataLoadedFlag(false);
        setProbCount(0);
        setCurrentProb(0);
        setCurrent(0);
        setQuizState(0);
        setProblem('');
        setRationale('');

        fetchQuizDetail();
    }, [quizID, refresh]);

    useFocusEffect(
        React.useCallback(() => {

        }, [quizID, refresh])
    );

    const fetchQuizDetail = useCallback(async () => {
        let data;
        if (isCustomeFlashCardQuiz) {
            const result = await getFlashCard(quizID)
            data = result.flashcard
            console.log('here', result.flashcard);
        } else {
            data = await getAllQuestions(quizID);
        }

        setQuizData(data);
        setDataLoaded(true);
        setDataLoadedFlag(true);
    }, [setQuizData, setDataLoaded, quizID]);

    const fetchMoreQuestions = useCallback(async () => {
        const data = await getAllQuestions(quizID)
        setQuizData((prevData: any) => {
            return {
                ...prevData,
                questions: [...prevData.questions, ...data.questions]
            }
        })
        setDataLoaded(true);
        setDataLoadedFlag(true);
    }, [setQuizData, setDataLoaded, setDataLoadedFlag, quizID])

    useEffect(() => {
        setProbCount(quizData?.questions?.length);
    }, [quizData]);



    useEffect(() => {
        if (dataLoaded && quizData) {
            setCurrentProbNumber(currentProb + 1);
            setTotalProbCount(probCount);

            setProblem(quizData.questions[currentProb]?.question);
            // setAnswer(quizData.answ[currentProb]?.answer);
            setRationale(quizData.questions[currentProb]?.answerExplanation);
            if (quizData.questions[currentProb]?.answers) {

                const newAnswers = quizData.questions[currentProb]?.answers.map((item: any, index: number) => {
                    if (item.correct) {
                        setAnswer(item.answer)
                    }

                })

            }
        }
    }, [currentProb, dataLoaded, quizData]);



    const NextProblem = useCallback(() => {
        if (currentProb + 2 >= quizData?.questions?.length && !isCustomeFlashCardQuiz) {
            fetchMoreQuestions()
        }

        setShowAnswer(false)
        NextProb();
    }, [quizState, answers, currentProb, probCount, navigation, setCurrentProb]);


    const NextProb = useCallback(() => {
        if (isCustomeFlashCardQuiz && currentProb + 2 > quizData?.questions?.length) {
            setCurrentProb(0)
            navigation.navigate("Dashboard")
        } else {
            setCurrentProb(currentProb + 1);
        }

        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }, [navigation, currentProb, probCount, setCurrentProb]);


    return (
        <View style={styles.container}>
            <TickAnim onTrigger={tickShow} setOnTrigger={setTickShow} hide={hideTick} setHide={setHideTick} CallBack={() => { setQuizState(1) }} />
            <CloseAnim onTrigger={closeShow} setOnTrigger={setCloseShow} hide={hide} setHide={setHide} CallBack={() => { setQuizState(1) }} />
            <ScrollView style={styles.innerContainer} ref={scrollRef}>
                <View style={styles.quizContainer}>
                    <Text style={styles.questionText}>
                        {problem}
                    </Text>
                </View>
                <View style={styles.answersContainer}>

                    <View style={{ padding: verticalScale(4) }}></View>
                    <View style={styles.buttonContainer}>

                        <PTFEButton
                            text={showAnswer ? "HIDE ANSWER" : "REVEAL ANSWER"}
                            type="rounded"
                            color="#87C6E8"
                            onClick={() => setShowAnswer((prev) => !prev)}
                        />
                        {
                            showAnswer && <View style={styles.quizContainer}>
                                {!isCustomeFlashCardQuiz && <View>
                                    <Text style={styles.rationaleHeader}>
                                        {"Answer: "}
                                    </Text>
                                    <Text style={styles.questionText}>
                                        {answer}
                                    </Text>
                                </View>}

                                <Text style={styles.rationaleHeader}>
                                    {"Answer Explanation: "}
                                </Text>
                                <Text style={styles.questionText}>
                                    {rationale}
                                </Text>
                            </View>
                        }
                        <PTFEButton
                            text={isCustomeFlashCardQuiz && currentProb + 2 > quizData?.questions?.length ? "FINISH" : "NEXT QUESTION"}
                            type={"rounded"}
                            color="#FF675B"
                            enabled={!(hide && hideTick)}
                            onClick={NextProblem}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}