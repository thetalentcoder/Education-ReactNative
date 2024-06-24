import React, { useCallback, useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import SectionStatus from "src/sections/Study/SectionStatus";
import SectionMainContent from "src/sections/Study/SectionMainContent";
import SectionHeader from "src/sections/Common/SectionHeader";
import texts from "src/config/texts";
import styles from "./StudyStyle";
import { PTFELoading } from "src/components/loading";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Study({
    route,
    navigation,
}: Props) {
    const [quizID, setQuizID] = useState(route.params?.quizID);
    const refresh = route.params?.refresh;

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
                    title={texts.txt_header_question}
                    goBack={gotoDashboard}
                />
            </View>
            <View style={styles.statusContainer}>
                <SectionStatus
                    currentProbNumber={currentProbNumber}
                    totalProbCount={totalProbCount}
                    currentScore={currentScore}
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
                />
            </View>

            {!dataLoaded && <PTFELoading />}
        </View>
    )
}