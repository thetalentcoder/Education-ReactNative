import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { moderateScale, verticalScale } from "src/config/scale";

import styles from "./PartUserInfoStyle";

type Props = {
  fullname?: string;
  score?: any;
  currentSeasonPoints: any;
  currentSeasonRank: any;
};

export default function PartUserInfo({
  fullname,
  score,
  currentSeasonPoints,
  currentSeasonRank,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{fullname}</Text>
      <View style={styles.userInfoContainer}>
        <View style={styles.columnWithLine}>
          <View style={{ paddingBottom: verticalScale(8) }}>
            <Ionicons
              name="ribbon-outline"
              size={moderateScale(18)}
              color="white"
            />
          </View>
          <Text style={styles.statusText}>
            {score > 1000 ? `${Math.round(score / 1000)}K` : score.toString()}
          </Text>
          <Text style={styles.labelText}>Lifetime Points</Text>
        </View>
        <View style={styles.columnWithLine}>
          <View style={{ paddingBottom: verticalScale(8) }}>
            <Ionicons
              name="ribbon-outline"
              size={moderateScale(18)}
              color="white"
            />
          </View>
          <Text style={styles.statusText}>
            {currentSeasonPoints > 1000 ? `${Math.round(currentSeasonPoints / 1000)}K` : currentSeasonPoints.toString()}
          </Text>
          <Text style={styles.labelText}>Season Points</Text>
        </View>
        <View style={styles.column}>
          <View style={{ paddingBottom: verticalScale(8) }}>
            <Ionicons
              name="trophy-outline"
              size={moderateScale(18)}
              color="white"
            />
          </View>
          <Text style={styles.statusText}>{currentSeasonRank}</Text>
          <Text style={styles.labelText}>Season Ranking</Text>
        </View>
        {/* <View style={styles.column}>
                    <View style={{paddingBottom: verticalScale(8)}}>
                        <Ionicons 
                            name="people-outline" 
                            size={moderateScale(20)} 
                            color="white"
                        />
                    </View>
                    <Text style={styles.statusText}>8912</Text>
                    <Text style={styles.labelText}>Followers</Text>
                </View> */}
      </View>
    </View>
  );
}
