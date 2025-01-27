import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { PTFEAvatar } from "src/components/avatar";
import styles from "./SectionUserInfoStyle";
import NinjaStarIcon from "assets/icons/NinjaStarIcon";
import { checkIfUserHastakenQuizToday, formatNumberWithCommas } from "src/utils/util";
import { moderateScale, verticalScale } from "src/config/scale";
import NotificationHandler from './ScheduleNotification';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  streaks: number;
  score: number;
};

export default function SectionUserInfo({ streaks = 0, score = 0 }: Props) {
  const [notification, setNotification] = useState(false);

  // Load notification preference on initialization
  useEffect(() => {
    const loadNotificationPreference = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem("notificationPreference");
        setNotification(savedPreference ? JSON.parse(savedPreference) : false);
      } catch (error) {
        console.error("Error loading notification preference:", error);
        setNotification(false); // Fallback value
      }
    };

    loadNotificationPreference();
  }, []);

  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const { user } = useSelector((state: any) => state.userData);
  const hasTakenQuizToday = checkIfUserHastakenQuizToday(user);

  const scoreDigit = score > 1000 ? `${(score / 1000).toFixed(1)}k` : score.toString();

  const streakMessage = user?.notifications?.find(
    (notification: { title: string }) => notification.title === "Streak"
  )?.message || "";

  return (
    <View style={styles.container}>
      {notification && (
        <NotificationHandler 
          streaks={streaks} 
          scheduleForTomorrow={hasTakenQuizToday} 
          message={streakMessage} 
        />
      )}
      <PTFEAvatar
        greeting="Good to see you, "
        userName={user?.fullname}
        avatar={user?.avatarUrl}
      />
      <View style={styles.userInfoContainer}>
        {/* Streak Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Streak")}
          style={styles.flameButtonContainer}
        >
          <View style={styles.flameIconButton}>
            <FontAwesome5
              name="fire-alt"
              size={moderateScale(26)}
              color="white"
            />
          </View>
          <View style={styles.streakTextContainer}>
            <Text style={styles.streakText}>{` ${streaks}`}</Text>
          </View>
        </TouchableOpacity>

        {/* Score Button */}
        <TouchableOpacity
          style={styles.scoreContainer}
          onPress={() => score && navigation.navigate("Points")}
        >
          <NinjaStarIcon size={verticalScale(20)} style={styles.ninjaStar} />
          <Text style={styles.scoreText}>{scoreDigit}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
