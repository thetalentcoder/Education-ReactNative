import React, { useCallback, useEffect, useRef, useState, } from "react";
import { Button, View } from "react-native";
import styles from "./TickAnimStyle";

import LottieView from "lottie-react-native";

type Props = {
    onTrigger: boolean;
    setOnTrigger: (newValue: boolean) => void;
    hide: boolean;
    setHide: (newValue: boolean) => void;
    CallBack: () => void;
}

export default function TickAnim({
    onTrigger,
    setOnTrigger,
    hide,
    setHide,
    CallBack,
} : Props) {
    const confettiRef = useRef<LottieView>(null);

    const finishAnim = useCallback(() => {
        setOnTrigger(false);
        setHide(true);

        CallBack();
    }, [setOnTrigger, setHide, CallBack]);

    useEffect(() => {
        if (onTrigger == true) {
            setHide(false);
            triggerConfetti();
        }
        else {
            setOnTrigger(false);
            setHide(true);
        }
    }, [onTrigger]);

    const triggerConfetti = () => {
        confettiRef.current?.play(0);
    }

    return (
        <>
            {
                hide ? 
                <></> : 
                <LottieView
                    ref={confettiRef}
                    source={require('../../../assets/animations/tick_animation.json')}
                    speed={3}
                    autoPlay={true}
                    loop={false}
                    style={styles.lottie}
                    onAnimationFinish={finishAnim}
                    resizeMode='cover'
                />
            }
        </>
    );
}


