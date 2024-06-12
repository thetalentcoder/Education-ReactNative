import React, { useCallback } from "react";
import { View } from "react-native";

import SectionCategory from "src/sections/Category/SectionCategory";
import styles from "./CategoryStyle";
import SectionHeader from "src/sections/Common/SectionHeader";
import { LinearGradient } from "expo-linear-gradient";
import { gameModeString } from "src/constants/consts";

type Props = {
    route?: any,
    navigation?: any,
}

export default function Category({
    route,
    navigation,
}: Props) {

    const { gameMode } = route.params;

    const gotoDashboard = useCallback(() => {
        navigation.navigate("Dashboard");
    }, [navigation]);

    return (
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
                    title={gameModeString[gameMode]}
                    goBack={gotoDashboard}
                />
            </View>
            <View style={styles.statusContainer}>
            </View>
            <View style={styles.sectionContentSlider}>
                <SectionCategory 
                    gameMode={gameMode} 
                    goBack={gotoDashboard} 
                />
            </View>
        </View>
    );
}