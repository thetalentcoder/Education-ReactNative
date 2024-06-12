import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, View } from "react-native";

import { Star } from "src/components/star";
import styles from "./PartStarsStyle";

const windowWidth = Dimensions.get("window").width;

const starData = [
    { x: 0.75, y: 0, size: 20, color: "yellow" },
    { x: 0.25, y: 0.05, size: 15, color: "white" },
    { x: 0.68, y: 0.15, size: 15, color: "white" },
    { x: 0.1, y: 0.18, size: 20, color: "yellow" },
    { x: 0.8, y: 0.25, size: 10, color: "yellow" },
    { x: 0.1, y: 0.35, size: 10, color: "white" },
    { x: 0.31, y: 0.37, size: 10, color: "yellow" },
    { x: 0.65, y: 0.35, size: 15, color: "yellow" },
    { x: 0.82, y: 0.44, size: 12, color: "white" },
    { x: 0.13, y: 0.57, size: 18, color: "white" },
];

export default function PartStars() {
    const [stars, setStars] = useState(starData);
    const animatedStars = stars.map(() => ({
        opacity: useRef(new Animated.Value(0)).current,
        scale: useRef(new Animated.Value(0.5)).current,
    }));

    useEffect(() => {
        const animations = animatedStars.map((anim, index) => {
            return Animated.sequence([
                Animated.delay(index * 100),
                Animated.parallel([
                    Animated.timing(anim.opacity, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.spring(anim.scale, {
                        toValue: 1,
                        friction: 3,
                        useNativeDriver: true,
                    }),
                ]),
            ]);
        });

        Animated.stagger(100, animations).start();
    }, []);

    return (
        <View style={styles.container}>
            {stars.map((star, index) => {
                const anim = animatedStars[index];
                return (
                    <Animated.View
                        key={index}
                        style={{
                            position: "absolute",
                            left: star.x * windowWidth,
                            top: star.y * windowWidth,
                            opacity: anim.opacity,
                            transform: [{ scale: anim.scale }],
                        }}
                    >
                        <Star size={star.size} color={star.color} />
                    </Animated.View>
                );
            })}
        </View>
    );
}
