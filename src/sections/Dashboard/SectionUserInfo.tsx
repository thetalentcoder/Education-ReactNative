import React, { useCallback, useEffect, useState } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { PTFEAvatar } from "src/components/avatar";
import styles from "./SectionUserInfoStyle";
import { useNavigation } from "@react-navigation/native";
import NinjaStarIcon from "assets/icons/NinjaStarIcon";

import { formatNumberWithCommas } from "src/utils/util";
import { moderateScale } from "src/config/scale";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  streaks: number;
  score: number;
};

export default function SectionUserInfo({ streaks = 0, score = 0 }: Props) {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  let scoreDigit = "";

  // Format the score for larger numbers
  if (score >= 1_000_000_000_000) {
    scoreDigit = (score / 1_000_000_000_000).toFixed(1) + "t";  // For trillion
  } else if (score >= 1_000_000_000) {
    scoreDigit = (score / 1_000_000_000).toFixed(1) + "b";      // For billion
  } else if (score >= 1_000_000) {
    scoreDigit = (score / 1_000_000).toFixed(1) + "m";          // For million
  } else if (score >= 1_000) {
    scoreDigit = (score / 1_000).toFixed(1) + "k";              // For thousand
  } else {
    scoreDigit = score.toString();                              // Below thousand
  }

  const { user } = useSelector((state) => state.userData);

  return (
    <View style={styles.container}>
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
