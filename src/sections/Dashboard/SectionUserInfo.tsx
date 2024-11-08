import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { PTFEAvatar } from "src/components/avatar";
import styles from "./SectionUserInfoStyle";
import NinjaStarIcon from "assets/icons/NinjaStarIcon";
import { checkIfUserHastakenQuizToday, formatNumberWithCommas } from "src/utils/util";
import { moderateScale } from "src/config/scale";
import NotificationHandler from './ScheduleNotification';

type Props = {
  streaks: number;
  score: number;
};

export default function SectionUserInfo({ streaks = 0, score = 0 }: Props) {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  let scoreDigit = score > 1000 ? `${(score / 1000).toFixed(1)}k` : score.toString();
  const { user } = useSelector((state) => state.userData);
  const hasTakenQuizToday = checkIfUserHastakenQuizToday(user);
  let streakMessage = "";

  // Check if user and user.notifications exist, and then find the relevant notification
  if (user && Array.isArray(user.notifications)) {
    const streakNotification = user.notifications.find((notification: { title: string; }) => notification.title === "Streak");
    if (streakNotification) {
      streakMessage = streakNotification.message; // Assuming the `message` property contains the message you need
    }
  }

  return (
    <View style={styles.container}>
      <NotificationHandler streaks={streaks} scheduleForTomorrow={hasTakenQuizToday} message={streakMessage}/>
      <PTFEAvatar
        greeting="Good to see you, "
        userName={user?.fullname}
        avatar={user?.avatarUrl}
      />
      <View style={styles.userInfoContainer}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate("Streak");
          }}
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
        <View>
          <TouchableOpacity
            style={styles.scoreContainer}
            onPress={async () => {
              score ? navigation.navigate("Points") : null;
            }}
          >
            <View style={styles.ninjaStar}><NinjaStarIcon /></View>
            <Text style={styles.scoreText}>
              {scoreDigit}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
