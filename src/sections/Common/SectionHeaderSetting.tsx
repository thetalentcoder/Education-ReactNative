import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

import styles from "./SectionHeaderSettingStyle";
import { moderateScale } from "src/config/scale";
import SettingIcon from "assets/icons/SettingIcon";

type Props = {
    title: string;
    goBack: () => void;
    showModal: () => void;
}

export default function SectionHeaderSetting({
    title,
    goBack,
    showModal,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.backContainer} onPress={goBack}>
                <View style={styles.back}>
                    <Entypo name="chevron-left" size={moderateScale(20)}
                        color="#FF675B" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingContainer} onPress={showModal}>
                <SettingIcon />
            </TouchableOpacity>
        </View>
    );
}