import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { logout } from "src/actions/auth/auth";

import SectionUserInfo from "src/sections/Dashboard/SectionUserInfo";
import SectionSlider from "src/sections/Dashboard/SectionSlider";
import SectionGameMode from "src/sections/Dashboard/SectionGameMode";
import SectionQuiz from "src/sections/Dashboard/SectionQuiz";

import { useDispatch, useSelector } from "react-redux";

import styles from "./DashboardStyle";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import SectionFlashCards from "src/sections/Dashboard/SectionFlashCards";
import SectionUserFlashCards from "src/sections/Dashboard/SectionUserFlashCards";

export default function Dashboard() {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userData.user);
  

  const scrollRef = useRef(0);
  const [refreshQuiz, setRefreshQuizList] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, []);
  const refreshUserData = useCallback(async () => {
    const userInfo = await getMe();
    dispatch(setUser(userInfo[0]));
  }, []);

  const refreshData = useCallback(async () => {
    setRefreshQuizList(!refreshQuiz);
    refreshUserData();
  }, [refreshQuiz, setRefreshQuizList]);



  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.backgroundCircle1} />
        {/* <View style={styles.backgroundCircle2} /> */}

        <View style={styles.sectionUserInfo}>
          <SectionUserInfo streaks={user?.streak} score={user.score}/>
        </View>
        <View style={styles.sectionGameMode}>
          <SectionGameMode />
        </View>

        <View style={styles.scrollViewArea}>
          <View style={styles.sectionSlider}>
            <SectionSlider />
          </View>
          <View style={styles.sectionQuiz}>
            <SectionFlashCards />
          </View>
          <View style={styles.sectionQuiz}>
            <SectionUserFlashCards refresh={refreshQuiz} />
          </View>
          <View style={styles.sectionQuiz}>
            <SectionQuiz refresh={refreshQuiz} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
