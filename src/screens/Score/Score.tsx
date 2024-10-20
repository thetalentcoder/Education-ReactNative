import React, { useCallback, useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SectionScore from "src/sections/Score/SectionScore";
import SectionShareScore from "src/sections/Score/SectionShareScore";

import texts from "src/config/texts";
import styles from "./ScoreStyle";

import { postSubmitQuizResult } from "src/actions/quiz/quiz";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import { checkIfUserHastakenQuizToday, sleep } from "src/utils/util";
import HeartAnim from "./HeartAnim";

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
    survivorLevel,
    matchedCount = 0,
    totalCount,
    answers
  } = route.params;

  console.log("SUBMIT DATA", matchedCount, totalCount);
  // console.log(route.params);
  // console.log(score);
  const [showModal, setShowModal] = useState(false);
  const [currentScore, setCurrentScore] = useState(score);
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.userData);

  const [allowHeart, setAllowHeart] = useState(0);
  const [heartShow, setHeartShow] = useState(true);
  const [heartHide, setHeartHide] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // const hasTakenQuizToday = checkIfUserHastakenQuizToday(user)
      // if (! hasTakenQuizToday) {
      const processResult = async () => {
        setCurrentScore(Math.floor(score));
        await submitResult();
        // await updateStatus();
      };

      processResult().catch(console.error);
      // }
    }, [id, submitData, score])
  );

  const submitResult = useCallback(async () => {
    const result = await postSubmitQuizResult({
      id: id,
      score: currentScore,
      quizMode: quizMode,
      title: title,
      numberOfQuestions: numberOfQuestions,
      answers: answers
    });
    // setScore(result.score);
  }, [id, quizMode, category, title, numberOfQuestions, currentScore]);

  // const updateStatus = useCallback(async () => {
  //     const userInfo = await getMe();
  //     dispatch(setUser(userInfo));

  //     if (user?.streak != userInfo?.streak) {
  //         setShowModal(true);
  //     }
  // }, [setShowModal]);

  const gotoDashboard = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  return (
    <View style={styles.container}>
      {quizMode == "survivorMode" && !score && <HeartAnim />}
      <LinearGradient
        colors={["#FF675B", "#87C6E8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.upperGradientContainer}
      ></LinearGradient>
      <View style={styles.headerContainer}>
        <SectionHeaderX
          title={''}
          goBack={gotoDashboard}
        />
      </View>
      <View style={styles.statusContainer}>
        {quizMode == "studyMode" ? (
          <SectionScore score={matchedCount} bShow={showModal} total={totalCount} mode={'study'}/>
        ) : (
          <SectionScore score={currentScore} bShow={showModal} total={totalCount} mode={'other'}/>
        )}
      </View>
      <View style={styles.imageContainer}>
        {(score != 0 || matchedCount != 0) && (
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
        />
      </View>
    </View>
  );
}
