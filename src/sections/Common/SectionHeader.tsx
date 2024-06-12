import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import styles from "./SectionHeaderStyle";
import { moderateScale } from "src/config/scale";

type Props = {
    title: string;
    goBack: () => void;
}

export default function SectionHeader({
    title,
    goBack,
}: Props) {
    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.backContainer} onPress={goBack}>
                <FontAwesome5 name="arrow-left" size={moderateScale(20)} color="white" />
            </TouchableOpacity>
        </View>
    );
}