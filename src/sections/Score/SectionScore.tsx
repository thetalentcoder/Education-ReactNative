import React from "react";
import { View, Text, Image } from "react-native";

import PartStars from "src/parts/Score/PartStars";
import styles from "./SectionScoreStyle";
import Confetti from "src/parts/Score/Confetti";
import StreakModal from "src/parts/Score/StreakModal";
import { PTFEButton } from "src/components/button";

type Props = {
    score: number;
    bShow: boolean;
}

export default function SectionScore({
    score,
    bShow = false,
}: Props) {
    return (
        <View style={styles.container}>
            <Confetti />
            {/* <View style={styles.starContainer}>
                <PartStars />
            </View> */}
            {/* <StreakModal bShow={bShow}/> */}
            {/* <View style={styles.avatarContainer}> */}
                {/* <Image style={styles.avatar} source={require("assets/images/avatar/sample.jpg")}/> */}
            {/* </View> */}
            <Text style={styles.complementText}>
                {`Great  try!`}
            </Text>
            <Text style={styles.profileText}>
                {`Your Score is`}
            </Text>
            <View style={styles.scoreSquare}>
                <Text style={styles.scoreText}>
                    {score}
                </Text>
            </View>
        </View>
    )
}