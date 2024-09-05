import React, { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";

import styles from "./ExplainStyle";
import { logout } from "src/actions/auth/auth";
import SectionStatus from "src/sections/Study/SectionStatus";
import SectionExplainContent from "src/sections/Explain/SectionExplainContent";
import { PTFEButton } from "src/components/button";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Explain({
    route, 
    navigation,
}: Props) {    
    const GoBack = useCallback(() => {
        navigation.navigate("Study", { refresh: false });
    }, [navigation]);

    const GoToNextQuestion = useCallback(() => {
        navigation.navigate("Study", { refresh: false, nextQuestion: true });
    }, [navigation]);

    const { answers, currentScore, currentProb, totalProbCount, rationale, topics } = route.params;

    console.log(route.params);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient>
            <ScrollView style={styles.innerContainer}>
                <View style={styles.headerContainer}>
                    <SectionHeader title="Explanation" goBack={GoBack}/>
                </View>
                <View style={styles.statusContainer}>
                    <SectionStatus
                        currentProbNumber={currentProb}
                        totalProbCount={totalProbCount}
                        currentScore={currentScore}
                        topics={topics}
                    />
                </View>
                <View style={styles.mainContent}>
                    <SectionExplainContent
                        answers={answers}
                        rationale={rationale}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <PTFEButton
                        text={"Next Question"}
                        type="rounded"
                        color="#FF675B"
                        onClick={GoToNextQuestion}
                    />
                </View>
            </ScrollView>
        </View>
    )
}