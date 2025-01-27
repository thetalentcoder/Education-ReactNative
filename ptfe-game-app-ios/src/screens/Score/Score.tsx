import React, { useCallback, useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SectionScore from "src/sections/Score/SectionScore";
import SectionShareScore from "src/sections/Score/SectionShareScore";

import styles from "./ScoreStyle";
import { postSubmitQuizResult } from "src/actions/quiz/quiz";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import HeartAnim from "./HeartAnim";
import { useGameMode } from '../../../GameModeContext';

type Props = {
  route?: any;
  navigation?: any;
};

export default function Score({ route, navigation }: Props) {
  const {
    id,
    submitData,
    score,
    quizMode,
    numberOfQuestions,
    title,
    category,
    matchedCount = 0,
    totalCount,
    answers,
    topic,
  } = route.params;

  const [currentScore, setCurrentScore] = useState(score);
  const dispatch = useDispatch();
  const { setGameState, setsubmitState, submitState } = useGameMode();

  const submitResult = useCallback(async () => {
    try {
      const result = await postSubmitQuizResult({
        id,
        score: currentScore,
        quizMode,
        title,
        numberOfQuestions,
        answers,
      });

      if (result) {
        const userInfo = await getMe();
        dispatch(setUser(userInfo));
      }
      setsubmitState(0);
    } catch (error) {
      console.error("Error submitting quiz result:", error);
    }
  }, [id, currentScore, quizMode, title, numberOfQuestions, answers, dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (submitState == 1) {
        submitResult();
      }

      return () => {
        // Reset the flag when leaving the screen if needed
        setsubmitState(0);
      };
    }, [submitState, submitResult])
  );

  const gotoDashboard = useCallback(() => {
    setGameState(1);
    navigation.navigate("Home");
  }, [navigation]);

  return (
    <View style={styles.container}>
      {quizMode === "survivorMode" && !score && <HeartAnim />}
      <LinearGradient
        colors={["#FF675B", "#87C6E8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.upperGradientContainer}
      />
      <View style={[styles.headerContainer, { zIndex: 10 }]}>
        <SectionHeaderX title={""} goBack={gotoDashboard} />
      </View>
      <View style={styles.statusContainer}>
        {quizMode === "studyMode" ? (
          <SectionScore
            score={matchedCount}
            bShow={false}
            total={totalCount}
            mode={"study"}
          />
        ) : (
          <SectionScore
            score={currentScore}
            bShow={false}
            total={totalCount}
            mode={"other"}
          />
        )}
      </View>
      <View style={styles.imageContainer}>
        {(score !== 0 || matchedCount !== 0) && (
          <Image
            source={require("../../../assets/images/imgs/pandasuccess.png")}
            style={styles.grayImage}
          />
        )}
      </View>
      <View style={styles.mainContent}>
        <SectionShareScore
          quizMode={quizMode}
          quizData={submitData}
          score={score}
          topic={topic}
        />
      </View>
    </View>
  );
}
