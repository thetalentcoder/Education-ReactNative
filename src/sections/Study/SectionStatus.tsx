import React from "react";
import { View, Text, Dimensions } from "react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";

import { formatNumberWithCommas } from "src/utils/util";
import styles from './SectionStatusStyle'
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

type Props = {
    currentProbNumber?: number;
    totalProbCount?: number;
    currentScore?: number;
}

export default function SectionStatus({
    currentProbNumber = 0,
    totalProbCount = 0,
    currentScore = 0,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.column1}>
                    <FontAwesome5 name="star" size={moderateScale(20)} color="white" />
                    <Text style={styles.statusText}>&nbsp;{`${currentProbNumber}/${totalProbCount}`}</Text>
                </View>
                <View style={styles.column2}>
                    <Entypo name="check" size={moderateScale(18)} color="white" />
                    <Text style={styles.statusText}>&nbsp;{`${formatNumberWithCommas(currentScore)}`}</Text>
                </View>
                <View style={styles.column3}>
                    <AntDesign name="appstore-o" size={moderateScale(20)} color="white" />
                    <Text style={styles.statusText}>&nbsp;All Topics</Text>
                </View>
            </View>
        </View>
    )
}