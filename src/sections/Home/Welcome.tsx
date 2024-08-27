import React from "react";
import { View, Text, Linking } from "react-native";
import { PTFEButton, PTFELinkButton } from "src/components/button";
import SwiperSection from "./Slides/SwiperSection";
import styles from "./WelcomeStyle";

type Props = {
    onClick: () => void;   // This seems to be used for the login button
}

const SectionWelcome: React.FC<Props> = ({ onClick }) => {

    const openLink = () => {
        Linking.openURL('http://ninja.ptfefinalexam.com/start')
            .catch(err => console.error("Failed to open URL:", err));
    };

    return (
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
                <Text style={styles.text}>Not registered yet?    </Text>
                <PTFELinkButton
                    text="Register here"
                    color="#FF675B"
                    underlined={false}
                    onClick={openLink}
                />
            </View>
        </View>
    );
}

export default SectionWelcome;
