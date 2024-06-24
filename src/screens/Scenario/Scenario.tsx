import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SectionStatus from "src/sections/Scenario/SectionStatus";
import SectionMainContent from "src/sections/Scenario/SectionMainContent";
import SectionHeader from "src/sections/Common/SectionHeader";
import texts from "src/config/texts";
import styles from "./ScenarioStyle";
import { PTFELoading } from "src/components/loading";

import { survivalLife } from "src/constants/consts";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Scenario({
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

    useEffect(() => {
        setCurrentLife(survivalLife);
        if (quizID == undefined) {
            gotoDashboard();
        }
    }, [quizID]);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentProbNumber, setCurrentProbNumber] = useState(0);
    const [currentLife, setCurrentLife] = useState(survivalLife);
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
                    setCurrentProbNumber={setCurrentProbNumber}
                    refresh={(refresh == true) ? true : false}
                    setDataLoadedFlag={setDataLoaded}
                    setCurrentLife={setCurrentLife}
                    setTotalProbCount={setTotalProbCount}
                    setCurrent={setCurrentScore}
                />
            </View>

            {!dataLoaded && <PTFELoading />}
        </View>
    )
}