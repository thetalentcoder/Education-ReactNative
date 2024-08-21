import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

import { formatNumberWithCommas } from "src/utils/util";
import styles from './SectionStatusStyle'
import { moderateScale, verticalScale } from "src/config/scale";

import { survivalLife } from "src/constants/consts";

const windowHeight = Dimensions.get("window").height;

type Props = {
    currentProbNumber: number;
    currentLife: number;
    currentScore: number;
    previousBest: number;
}

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
                    <FontAwesome5 name="star" size={moderateScale(20)} color="white" />
                    <Text style={styles.statusText}>&nbsp;{`${currentProbNumber}`}</Text>
                </View>
                <View style={styles.column3}>
                    <FontAwesome5 name="star" size={moderateScale(20)} color="white" />
                    <Text style={styles.statusText}>&nbsp;{`${previousBest}`}</Text>
                </View>
                <View style={styles.column2}>
                    <FontAwesome5 name="trophy" size={moderateScale(18)} color="white" />
                    <Text style={styles.statusText}>&nbsp;{` ${formatNumberWithCommas(currentScore)}`}</Text>
                </View>
                <View style={styles.column4}>
                    {
                        life.map((life, index) => (
                        <AntDesign
                            key={index}
                            name={life ? 'heart' : 'hearto'}
                            size={moderateScale(18)}
                            color="white"
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}