import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { PTFEButton, PTFELinkButton } from "src/components/button";
import SwiperSection from "./Slides/SwiperSection";
import styles from "./WelcomeStyle";

type Props = {
    onClick: () => void;
    onRegister:() => void;
}

export default function SectionWelcome({
    onClick,
    onRegister,
}: Props) {
    return(
        <View style={styles.container}>
            <View style={styles.activeDotContainer}>

            </View>

            <View style={styles.swiperContainer}>
                <SwiperSection />
            </View>

            <View style={styles.buttonContainer}>
                <PTFEButton
                    text="LOG IN NOW"
                    type="rounded"
                    color="#FF675B"
                    onClick={onClick}
                />
            </View>
            <View style={styles.textButtonContainer}>
                <Text style={styles.text}>Not registered yet?</Text>
                <PTFELinkButton
                    text="Register here"
                    color="#FF675B"
                    underlined={false}
                    onClick={onRegister}
                />
                <Text></Text>
            </View>
        </View>
    );
}