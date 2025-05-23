import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

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
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.backRoute} onPress={goBack}>
                <View style={styles.back}>
                    <Entypo name="chevron-left" size={moderateScale(20)}
                        color="#FF675B" />
                </View>
            </TouchableOpacity>
        </View>
    );
}