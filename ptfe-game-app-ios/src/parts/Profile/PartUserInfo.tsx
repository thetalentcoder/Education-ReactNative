import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NinjaStarIcon from "assets/icons/NinjaStarIcon";

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
            <View style={{ height: verticalScale(22.5) }}>
              <NinjaStarIcon />
            </View>
          </View>
          <Text style={styles.statusText}>
            {score > 1000 ? `${(score / 1000).toFixed(1)}k` : score.toString()}
          </Text>
          <Text style={styles.labelText}>{"Lifetime\nPoints"}</Text>
        </View>
        <View style={styles.columnWithLine}>
          <View style={{ paddingBottom: verticalScale(8) }}>
            <View style={{ height: verticalScale(22.5) }}>
              <NinjaStarIcon />
            </View>
          </View>
          <Text style={styles.statusText}>
            {currentSeasonPoints > 1000 ? `${(currentSeasonPoints / 1000).toFixed(1)}k` : currentSeasonPoints.toString()}
          </Text>
          <Text style={styles.labelText}>{"Season\nPoints"}</Text>
        </View>
        <View style={styles.column}>
          <View style={{ paddingBottom: verticalScale(8) }}>
            <Ionicons
              name="trophy-outline"
              size={moderateScale(19)}
              color="white"
            />
          </View>
          <Text style={styles.statusText}>{currentSeasonRank}</Text>
          <Text style={styles.labelText}>{"Season\nRanking"}</Text>
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
