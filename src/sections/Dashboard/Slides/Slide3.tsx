import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { PTFELinkButton } from "src/components/button";
import texts from "src/config/texts";
import styles from "./SlideStyle"

export default function Slide3() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
            >
                <Text style={styles.text_title}>
                    {texts.txt_screen_dashboard_card}
                </Text>

                <PTFELinkButton
                    text="Explore Now ->"
                    color="yellow"
                    underlined={false}
                    onClick={() => {}}
                />
            </LinearGradient>
        </View>
    );
}