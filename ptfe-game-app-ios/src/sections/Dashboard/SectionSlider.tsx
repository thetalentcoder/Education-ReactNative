import React from "react";
import { View } from "react-native";
import styles from "./SectionSliderStyle";

import SwiperSection from "./Slides/SwiperSection";

type Props = {
}

export default function SectionSlider({
}: Props) {
    return(
        <View style={styles.container}>
            <SwiperSection />
        </View>
    );
}