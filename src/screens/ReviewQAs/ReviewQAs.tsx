import React, { useCallback } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";
import SectionProfileContent from "src/sections/Profile/SectionProfileContent";

import styles from "./ReviewQAsStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { scale } from "src/config/scale";
import SectionStatus from "src/sections/Question/SectionStatus";
import SectionReviewContent from "src/sections/ReviewQAs/SectionReviewContent";

type Props = {
    route?: any;
    navigation?: any;
}

export default function ReviewQAs({
    route, 
    navigation,
}: Props) {
    const { quizData } = route.params;
    
    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    const onSignOut = useCallback(async () => {
        await logout();
        navigation.navigate("Login");
    }, [navigation]);

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
                    <SectionHeader title="Review Questions" goBack={gotoDashboard}/>
                </View>
                <View style={styles.statusContainer}>
                    <SectionStatus
                        currentProbNumber={13}
                        totalProbCount={20}
                        currentScore={1231}
                    />
                </View>
                <View style={styles.mainContent}>
                    <SectionReviewContent
                        quizData={quizData}
                    />
                </View>
            </ScrollView>
        </View>
    )
}