import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import NinjaSharpeIcon from "assets/icons/NinjaSharpeIcon";

import { formatNumberWithCommas } from "src/utils/util";
import styles from "./SectionStatusStyle";
import { moderateScale, verticalScale } from "src/config/scale";
import SurvivorModeIconInside from "assets/icons/SurvivorModeIconInside";
import { survivalLife } from "src/constants/consts";
import NinjaStarIcon from "assets/icons/NinjaStarIcon";

const windowHeight = Dimensions.get("window").height;

type Props = {
  currentProbNumber: number;
  currentLife: number;
  currentScore: number;
  previousBest: number;
};

export default function SectionStatus({
  currentProbNumber = 0,
  currentLife = 0,
  currentScore = 0,
  previousBest = 0,
}: Props) {
  const [life, setLife] = useState(Array());
  useEffect(() => {
    setLife(Array.from({ length: survivalLife }, (v, i) => i < currentLife));
  }, [currentLife]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.column1}>
          <View>
            <NinjaSharpeIcon />
          </View>
          <Text style={styles.statusText}>&nbsp;{`${currentProbNumber}`}</Text>
        </View>
        <View style={styles.column3}>
          <SurvivorModeIconInside />
          <Text
            style={[styles.statusText, { marginRight: 10 }]}
          >{`${previousBest}`}</Text>
        </View>
        <View style={styles.column2}>
          <View>
            <NinjaStarIcon />
          </View>
          <Text style={styles.statusText}>
            &nbsp;{` ${formatNumberWithCommas(currentScore)}`}
          </Text>
        </View>
        <View style={styles.column4}>
          {life.map((life, index) => (
            <AntDesign
              key={index}
              name={life ? "heart" : "hearto"}
              size={moderateScale(18)}
              color="white"
            />
          ))}
        </View>
      </View>
    </View>
  );
}
