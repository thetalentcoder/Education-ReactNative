import React, { useEffect, useRef, } from "react";
import { Button, View } from "react-native";
import styles from "./ConfettiStyle";

import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function Confetti() {
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
            source={require('../../../assets/animations/confetti.json')}
            autoPlay={false}
            loop={false}
            style={styles.lottie}
            resizeMode='cover'
        />
    );

}


