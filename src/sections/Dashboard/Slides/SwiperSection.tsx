import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Swiper from "react-native-swiper";

import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const slides = [
    { id: 1, text: 'Slide 1' },
    { id: 2, text: 'Slide 2' },
    { id: 3, text: 'Slide 3' },
];

const windowHeight = Dimensions.get("window").height;

export default function SwiperSection() {
    return (
        <>
            <View style={styles.container}>
                <Swiper
                    loop={true}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                    paginationStyle={{ bottom: 0 }}
                    index={1}
                    autoplayDirection={true}
                    scrollViewStyle={{ overflow: 'visible' }}
                    removeClippedSubviews={false}
                    containerStyle={{ width: scale(340) }}
                    loadMinimal={false}
                    loadMinimalLoader={<Text>Loading</Text>}
                >
                    {slides.map((slide) => (
                        <View key={slide.id}>
                            {slide.id == 1 ? <Slide1 /> :
                                slide.id == 2 ? <Slide2 /> :
                                    slide.id == 3 ? <Slide3 /> : <></>}
                        </View>
                    ))}
                </Swiper>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(24),
        height: verticalScale(263),
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: "12%",
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        margin: moderateScale(3),
    },
    activeDot: {
        backgroundColor: '#87C6E8',
        width: "25%",
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        margin: moderateScale(3),
    },
});