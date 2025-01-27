import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SectionScore from "src/sections/Score/SectionScore";
import SectionShareScore from "src/sections/Score/SectionShareScore"

import texts from "src/config/texts";
import styles from "./CurrentStreakStyle";

import { postSubmitQuizResult } from "src/actions/quiz/quiz";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import { sleep } from "src/utils/util";
import StreakModal from "src/parts/Score/StreakModal";
import Loading from "src/components/loading/ptfe-loading";
import { useGameMode } from "GameModeContext";

type Props = {
    route?: any;
    navigation?: any;
}

export default function CurrentStreak({
    route,
    navigation,
}: Props) {

    const { id, submitData, score, quizMode, numberOfQuestions, title, category, answers, topic, totalCount, matchedCount } = route.params;
    const { setGameState, setsubmitState, submitState } = useGameMode();
    const [showModal, setShowModal] = useState(false);
    const [currentScore, setCurrentScore] = useState(score);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    console.log("this is current streak page", submitData);
    const { user } = useSelector((state: any) => state.userData);

    useFocusEffect(
        React.useCallback(() => {
            const processResult = async () => {
                setIsLoading(true)
                setCurrentScore(Math.floor(score));
                if (submitState == 1) {
                    await submitResult();
                }                
                await updateStatus();
                setIsLoading(false)
            };
            setsubmitState(0);
            processResult().catch(console.error);
        }, [id, submitData, score])
    );

    const submitResult = useCallback(async () => {
        const result = await postSubmitQuizResult({
            id: id,
            score: currentScore,
            quizMode: quizMode,
            title: title,
            numberOfQuestions: numberOfQuestions,
            category: category
        });
        if (result) {
            const userInfo = await getMe();
            dispatch(setUser(userInfo));
            setsubmitState(0);
        }        
        // setScore(result.score);
    }, [id, quizMode, category, title, numberOfQuestions, currentScore]);

    const updateStatus = useCallback(async () => {
        const userInfo = await getMe();
        dispatch(setUser(userInfo));

        if (user?.streak != userInfo?.streak) {
            setShowModal(true);
        }
    }, [setShowModal]);


    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    const goToScorePage = () => {
        navigation.navigate("Score", {
            id,
            submitData,
            title,
            score,
            quizMode,
            numberOfQuestions,
            answers,
            totalCount,
            matchedCount,
            topic
        });
    }

    return (
        <View style={styles.container}>
            <StreakModal bShow={true} goToScorePage={goToScorePage} />
            {isLoading && <Loading />}
        </View>
    )
}