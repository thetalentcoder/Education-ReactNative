import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import SectionHeader from "src/sections/Common/SectionHeader";
import SectionScore from "src/sections/Score/SectionScore";
import SectionMainContent from "src/sections/Score/SectionShareScore"

import texts from "src/config/texts";
import styles from "./ScoreStyle";

import { postSubmitQuizResult } from "src/actions/quiz/quiz";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import { useDispatch } from "react-redux";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Score({
    route,
    navigation,
}: Props) {
    const { id, submitData, score, quizMode } = route.params;
    const [currentScore, setCurrentScore] = useState(84);
    const dispatch = useDispatch();

    useFocusEffect(
        React.useCallback(() => {
            setCurrentScore(Math.floor(score));
            submitResult();
        }, [id, submitData, score])
    );

    const submitResult = useCallback(async () => {
        const result = await postSubmitQuizResult({
            id: id,
            score: currentScore,
            quizMode: quizMode,
        });


        const userInfo = await getMe();
        dispatch(setUser(userInfo));

        // setScore(result.score);
    }, [id, submitData, currentScore]);


    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.upperGradientContainer}
            ></LinearGradient>
            <View style={styles.headerContainer}>
                <SectionHeader
                    title={texts.txt_header_success}
                    goBack={gotoDashboard}
                />
            </View>
            <View style={styles.statusContainer}>
                <SectionScore
                    score={currentScore}
                />
            </View>
            <View style={styles.mainContent}>
                <SectionMainContent
                    quizMode={quizMode}
                    quizData={submitData}
                />
            </View>
        </View>
    )
}