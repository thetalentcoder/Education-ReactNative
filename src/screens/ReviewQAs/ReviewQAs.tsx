import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import SectionProfileContent from "src/sections/Profile/SectionProfileContent";

import styles from "./ReviewQAsStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { moderateScale, scale } from "src/config/scale";
import SectionStatus from "src/sections/Question/SectionStatus";
import SectionReviewContent from "src/sections/ReviewQAs/SectionReviewContent";

import { Entypo } from '@expo/vector-icons';

type Props = {
    route?: any;
    navigation?: any;
}

export default function ReviewQAs({
    route, 
    navigation,
}: Props) {
    const { quizData, score } = route.params;
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        setContentVerticalOffset(prev => prev + 1);
    }, [scrollRef.current]);

    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 300;
    
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
            <ScrollView 
                style={styles.innerContainer} 
                ref={scrollRef}
                onScroll={event => {
                    setContentVerticalOffset(event.nativeEvent.contentOffset.y);
                }}
            >
                <View style={styles.headerContainer}>
                    <SectionHeaderX title="Review Questions" goBack={gotoDashboard}/>
                </View>
                <View style={styles.statusContainer}>
                    <SectionStatus
                        currentProbNumber={20}
                        totalProbCount={20}
                        currentScore={score}
                    />
                </View>
                <View style={styles.mainContent}>
                    <SectionReviewContent
                        quizData={quizData}
                        scrollRef={scrollRef}
                    />
                </View>
            </ScrollView>
            {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
                    <TouchableOpacity 
                        style={styles.scrollTopButton} 
                        onPress={() => {
                            scrollRef.current?.scrollTo({
                                y: 0,
                                animated: true,
                            });
                        }}
                    >
                        <Entypo name="chevron-up" size={moderateScale(40)} color="white" />
                    </TouchableOpacity>
                )}
        </View>
    )
}