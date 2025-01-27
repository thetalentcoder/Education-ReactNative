import React from "react";
import { View, Text, Dimensions } from "react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import NinjaStarIcon from "assets/icons/NinjaStarIcon";
import NinjaSharpeIcon from "assets/icons/NinjaSharpeIcon";

import { formatNumberWithCommas } from "src/utils/util";
import styles from "./SectionStatusStyle";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

type Props = {
  currentProbNumber?: number;
  totalProbCount?: number;
  currentScore?: number;
  topics?: string;
};

export default function SectionStatus({
  currentProbNumber = 0,
  totalProbCount = 0,
  currentScore = 0,
  topics = "",
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.column1}>
          <View>
            <NinjaSharpeIcon />
          </View>
          <Text style={styles.statusText}>&nbsp;{`${currentProbNumber}`}</Text>
        </View>
        <View style={styles.column2}>
          <View>
            <NinjaStarIcon />
          </View>
          <Text style={styles.statusText}>
            &nbsp;{`${formatNumberWithCommas(currentScore)}`}
          </Text>
        </View>
        <View style={styles.column3}>
          <AntDesign name="appstore-o" size={moderateScale(20)} color="white" />
          <Text style={styles.statusText}>
            &nbsp;{topics?.slice(0, 10) + "..."}
          </Text>
        </View>
      </View>
    </View>
  );
}
