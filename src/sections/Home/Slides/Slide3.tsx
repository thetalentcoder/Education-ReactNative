import React from "react";
import { View, Text } from "react-native";

import texts from "src/config/texts";
import styles from "./SlideStyle"

export default function Slide3() {
    return (
        <View style={styles.container}>
            <Text style={styles.text_title}>
                {texts.txt_screen_home_slider1_title}
            </Text>
            <Text style={styles.text_content}>
                {texts.txt_screen_home_slider1_content}
            </Text>
        </View>
    );
}