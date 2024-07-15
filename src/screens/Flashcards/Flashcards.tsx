import React, { useCallback, useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import SectionStatus from "src/sections/Flashcards/SectionStatus";
import SectionMainContent from "src/sections/Flashcards/SectionMainContent";
import SectionHeader from "src/sections/Common/SectionHeader";
import texts from "src/config/texts";
import styles from "./FlashcardsStyle";
import { PTFELoading } from "src/components/loading";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Flashcards({
    route,
    navigation,
}: Props) {
    const [quizID, setQuizID] = useState(route.params?.quizID);
    const [topics, setTopics] = useState(route.params?.quizID);
    const refresh = route.params?.refresh;
    const isCustomeFlashCardQuiz = route.params?.custom;
    const title = route.params?.title;

    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    useEffect(() => {
        const quizID = route.params?.quizID;
        setQuizID(quizID);
    }, [route]);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentProbNumber, setCurrentProbNumber] = useState(0);
    const [totalProbCount, setTotalProbCount] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            />
            <View style={styles.headerContainer}>
                <SectionHeader
                    title={"Flashcards Mode"}
                    goBack={gotoDashboard}
                />
            </View>
            <View style={styles.statusContainer}>
                <SectionStatus
                    currentProbNumber={currentProbNumber}
                    totalProbCount={totalProbCount}
                    currentScore={currentScore}
                    topics={title}
                />
            </View>
            <View style={styles.mainContent}>
                <SectionMainContent
                    quizID={quizID}
                    refresh={(refresh == true) ? true : false}
                    setCurrentProbNumber={setCurrentProbNumber}
                    setTotalProbCount={setTotalProbCount}
                    setDataLoadedFlag={setDataLoaded}
                    setCurrent={setCurrentScore}
                    topics={topics}
                    isCustomeFlashCardQuiz={isCustomeFlashCardQuiz}
                />
            </View>

            {!dataLoaded && <PTFELoading />}
        </View>
    )
}