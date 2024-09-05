import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SectionScore from "src/sections/Score/SectionScore";
import SectionShareScore from "src/sections/Score/SectionShareScore"

import texts from "src/config/texts";
import styles from "./ScoreStyle";

import { postSubmitQuizResult } from "src/actions/quiz/quiz";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import { checkIfUserHastakenQuizToday, sleep } from "src/utils/util";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Score({
    route,
    navigation,
}: Props) {
    const { id, submitData, score, quizMode, numberOfQuestions, title, category, survivorLevel } = route.params;

    console.log(submitData);
    // console.log(route.params);
    // console.log(score);
    const [showModal, setShowModal] = useState(false);
    const [currentScore, setCurrentScore] = useState(score);
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);

    useFocusEffect(
        React.useCallback(() => {
            // const hasTakenQuizToday = checkIfUserHastakenQuizToday(user)
            // if (! hasTakenQuizToday) {
                const processResult = async () => {
                    console.log("Submit Result");
                    setCurrentScore(Math.floor(score));
                    await submitResult();
                    // await updateStatus();
                };
                
                processResult().catch(console.error);
            // }
        }, [id, submitData, score])
    );

    const submitResult = useCallback(async () => {
        const result = await postSubmitQuizResult({
            id: id,
            score: currentScore,
            quizMode: quizMode,
            title: title,
            numberOfQuestions: numberOfQuestions,
            category: category,
        });
        // setScore(result.score);
    }, [id, quizMode, category, title, numberOfQuestions, currentScore]);

    // const updateStatus = useCallback(async () => {
    //     const userInfo = await getMe();
    //     dispatch(setUser(userInfo));

    //     if (user?.streak != userInfo?.streak) {
    //         setShowModal(true);
    //     }
    // }, [setShowModal]);


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
                <SectionHeaderX
                    title={texts.txt_header_success}
                    goBack={gotoDashboard}
                />
            </View>
            <View style={styles.statusContainer}>
                <SectionScore
                    score={currentScore}
                    bShow={showModal}
                />
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.grayImage} />
            </View>
            <View style={styles.mainContent}>
                <SectionShareScore
                    quizMode={quizMode}
                    quizData={submitData}
                    score={score}
                />
            </View>
        </View>
    )
}