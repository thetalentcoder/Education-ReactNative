import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SectionStatus from "src/sections/Question/SectionStatus";
import SectionMainContent from "src/sections/Question/SectionMainContent";
import SectionHeader from "src/sections/Common/SectionHeader";
import texts from "src/config/texts";
import styles from "./QuestionStyle";
import { PTFELoading } from "src/components/loading";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Question({
    route, 
    navigation,
}: Props) {
    const [quizID, setQuizID] = useState(route.params?.quizID);

    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            console.log(quizID);
            if (quizID == undefined) {
                gotoDashboard();
            }
        }, [])
    );

    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentProbNumber, setCurrentProbNumber] = useState(0);
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
                    setTotalProbCount={setTotalProbCount}
                    setDataLoadedFlag={setDataLoaded}
                    setCurrent={setCurrentScore}
                />
            </View>

            {!dataLoaded && <PTFELoading/>}
        </View>
    )
}