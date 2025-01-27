import React, { useEffect, useState } from "react";
import { View, Text, Linking } from "react-native";
import { PTFEButton, PTFELinkButton } from "src/components/button";
import SwiperSection from "./Slides/SwiperSection";
import styles from "./WelcomeStyle";
import { getAllSliders } from "src/actions/slider/slider";

type Props = {
    onClick: () => void;   // This seems to be used for the login button
}

type Slider = {
    title: string;
    content: string;
};

const SectionWelcome: React.FC<Props> = ({ onClick }) => {
    const [slides, setSlides] = useState<Slider[]>([]);
    const sliderIndex: { id: number; }[] = [];

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const sliderdata = await getAllSliders();
                setSlides(sliderdata.sliders);
            } catch (error) {
                console.error("Error fetching sliders:", error);
            }
        };

        fetchSliders();
    }, []);

    const openLink = () => {
        Linking.openURL('https://ninja.ptfinalexam.com/')
            .catch(err => console.error("Failed to open URL:", err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.activeDotContainer}>
            </View>
            <View style={styles.swiperContainer}>
                <SwiperSection sliderData={slides}/>
            </View>
            <View style={styles.buttonContainer}>
                <PTFEButton
                    text="Log in Now"
                    type="rounded"
                    color="#FF675B"
                    onClick={onClick}
                />
            </View>
            <View style={styles.textButtonContainer}>
                {/* <Text style={styles.text}>Not registered yet?    </Text>
                <PTFELinkButton
                    text="Register here"
                    color="#FF675B"
                    underlined={false}
                    onClick={openLink}
                /> */}
            </View>
        </View>
    );
}

export default SectionWelcome;
