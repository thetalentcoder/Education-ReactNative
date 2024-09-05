import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import SectionWelcome from "src/sections/Home/Welcome";
import styles from "./HomeStyle";

export default function Welcome() {
    const navigation:any = useNavigation();

    const handleClick = () => {
        navigation.navigate(`Login`);
    }

    const handleRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.upperGradientContainer}
            />
            <View style={styles.backgroundCircle1} />
            <View style={styles.backgroundCircle2} />
            <View style={styles.backgroundCircle3} />
            <View style={styles.backgroundSquare} />

            <View style={styles.sectionStartImage}>
                <View style={styles.grayImage} />
            </View>

            <View style={styles.sectionContentSlider}>
                <SectionWelcome onClick={handleClick} onRegister={handleRegister}/>
            </View>
        </View>
    );
}