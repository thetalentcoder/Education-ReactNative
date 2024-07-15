import React, { useCallback, useState } from "react";
import { View } from "react-native";

import SectionCategory from "src/sections/SelectFlashcardTitle/SectionCategory";
import styles from "./SelectFlashcardTitleStyle";
import SectionHeader from "src/sections/Common/SectionHeader";
import { LinearGradient } from "expo-linear-gradient";
import { gameModeString } from "src/constants/consts";
import { useFocusEffect } from "@react-navigation/native";
import CustomKeyboardAvoidingView from "src/wrappers/CustomKeyboardAvoidingView";

type Props = {
    route?: any,
    navigation?: any,
}

export default function SelectFlashcardTitle({
    route,
    navigation,
}: Props) {
    const [gameMode, setGameMode] = useState(route.params && route.params["gameMode"] != undefined ? route.params["gameMode"] : 1);

    useFocusEffect(
        React.useCallback(() => {
            if (route.params && route.params["gameMode"] != undefined) {
                setGameMode(route.params["gameMode"]);
            }
        }, [route.params, setGameMode])
    );

    const gotoDashboard = () => {
        navigation.goBack()
    }

    return (
        <CustomKeyboardAvoidingView>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FF675B', '#87C6E8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.upperGradientContainer}
                >
                </LinearGradient>
                <View style={styles.headerContainer}>
                    <SectionHeader
                        title='New Flashcard Deck'
                        goBack={gotoDashboard}
                    />
                </View>
                <View style={styles.sectionContentSlider}>
                    <SectionCategory />
                </View>
            </View>
        </CustomKeyboardAvoidingView>
    );
}