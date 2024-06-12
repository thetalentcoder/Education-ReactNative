import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { TopSection } from "src/sections/Ranking/TopSection";
import { BottomSection } from "src/sections/Ranking/BottomSection";

import styles from "./RankingStyle";

export default function Ranking() {
    const [gameMode, SetGameMode] = useState("0");
    const handleSelect = (value: string) => {
        SetGameMode(value);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <View style={styles.topSection}>
                    <TopSection handleSelect={handleSelect}/>
                </View>
                <View style={styles.bottomSection}>
                    <BottomSection gameMode={gameMode}/>
                </View>
            </ScrollView>
        </View>
    );
}