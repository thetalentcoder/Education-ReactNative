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
import SectionStatus from "src/sections/Study/SectionStatus";
import SectionReviewContent from "src/sections/ReviewQAs/SectionReviewContent";

import { Entypo } from '@expo/vector-icons';
import SectionHeader from "src/sections/Common/SectionHeader";
import { useSelector } from "react-redux";

type Props = {
    route?: any;
    navigation?: any;
}

export default function ReviewQAs({
    route, 
    navigation,
}: Props) {
    const { user } = useSelector((state: any) => state.userData);

    const { quizData, score, topic, quizMode } = route.params;
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        setContentVerticalOffset(prev => prev + 1);
    }, [scrollRef.current]);

    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 300;
    
    const goback = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onSignOut = useCallback(async () => {
        await logout();
        navigation.navigate("Login");
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient> */}
            <ScrollView 
                style={styles.innerContainer} 
                ref={scrollRef}
                onScroll={event => {
                    setContentVerticalOffset(event.nativeEvent.contentOffset.y);
                }}
            >
                <LinearGradient
                    colors={['#FF675B', '#87C6E8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.upperGradientContainer}
                    >
                </LinearGradient>
                <View style={styles.headerContainer}>
                    <SectionHeader title="Review Questions" goBack={goback}/>
                </View>
                <View style={styles.statusContainer}>
                    <SectionStatus
                        currentProbNumber={quizData?.length}
                        totalProbCount={quizData?.length}
                        currentScore={score}
                        // topics={user.selectedCategories}
                        topics={topic}
                    />
                </View>
                <View style={styles.mainContent}>
                    <SectionReviewContent
                        quizData={quizData}
                        quizMode={quizMode}
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