import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SectionStatus from "src/sections/Classic/SectionStatus";
import SectionMainContent from "src/sections/Classic/SectionMainContent";
import SectionHeader from "src/sections/Common/SectionHeader";
import texts from "src/config/texts";
import styles from "./ClassicStyle";
import { PTFELoading } from "src/components/loading";

import { survivalLife } from "src/constants/consts";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Classic({
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