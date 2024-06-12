import React from "react";
import { View } from "react-native";
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
            <View style={styles.sectionContentSlider}>
                <SectionWelcome onClick={handleClick} onRegister={handleRegister}/>
            </View>
        </View>
    );
}