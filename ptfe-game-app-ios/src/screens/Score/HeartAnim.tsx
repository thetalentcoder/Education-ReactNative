import React, { useEffect, useRef, } from "react";
import { Button, View } from "react-native";
import styles from "./HeartAnimStyle";

import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function HeartAnim() {
    const confettiRef = useRef<LottieView>(null);

    useFocusEffect(
        React.useCallback(() => {
            triggerConfetti()
        }, [])
    );

    
    function triggerConfetti() {
        confettiRef.current?.play(0);
    }

    return (
        <LottieView
            ref={confettiRef}
            source={require('../../../assets/animations/heart_animation.json')}
            autoPlay={false}
            loop={false}
            style={[styles.lottie, { pointerEvents: 'none' }]}
            resizeMode='cover'
        />
    );

}


