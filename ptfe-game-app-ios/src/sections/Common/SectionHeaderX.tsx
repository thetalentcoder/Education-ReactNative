import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

import styles from "./SectionHeaderStyle";
import { moderateScale } from "src/config/scale";
import { useNavigation } from "@react-navigation/native";

type Props = {
    title: string;
    goBack: () => void;
}

export default function SectionHeaderX({
    title,
    goBack,
}: Props) {

    const navigation: any = useNavigation();
    const gotoDashboard = useCallback(() => {
        navigation.navigate("profile");
    }, [navigation]);

    
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.backContainer} onPress={goBack}>
                <View style={styles.back}>
                    <Entypo name="cross" size={moderateScale(20)}
                        color="#FF675B" />
                </View>
            </TouchableOpacity>
        </View>
    );
}