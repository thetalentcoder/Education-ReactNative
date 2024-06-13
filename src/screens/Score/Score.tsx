import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator, Text, TouchableOpacity, Alert } from "react-native";

import SectionHeader from "src/sections/Common/SectionHeader";
import SectionScore from "src/sections/Score/SectionScore";
import SectionMainContent from "src/sections/Score/SectionMainContent";

import texts from "src/config/texts";
import styles from "./ScoreStyle";

import { postSubmitQuizResult } from "src/actions/quiz/quiz";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  route?: any;
  navigation?: any;
};

export default function Score({ route, navigation }: Props) {
  const { id, submitData, score, quizMode } = route.params;
  const [currentScore, setCurrentScore] = useState(84);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentScore(Math.floor(score));
  }, [score]);

  useFocusEffect(
    useCallback(() => {
      submitResult();
    }, [])
  );

  const submitResult = useCallback(async () => {
    setLoading(true);
    try {
      const result = await postSubmitQuizResult({
        id: id,
        score: currentScore,
        quizMode: quizMode,
      });

      const userInfo = await getMe();
      dispatch(setUser(userInfo));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to submit quiz result. Please try again later.");
    }
  }, [id, currentScore]);

  const gotoDashboard = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF675B", "#87C6E8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.upperGradientContainer}
      ></LinearGradient>
      <View style={styles.headerContainer}>
        <SectionHeader title={texts.txt_header_success} goBack={gotoDashboard} />
      </View>
      <View style={styles.statusContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Submitting Quiz Result...</Text>
          </View>
        ) : (
          <SectionScore score={currentScore} />
        )}
      </View>
      <View style={styles.mainContent}>
        <SectionMainContent quizMode={quizMode} quizData={submitData} />
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={gotoDashboard}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
