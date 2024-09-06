import React from "react";
import { View, Text, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./SectionShareScoreStyle";
import { PTFEButton, PTFESquareButton } from "src/components/button";
import { scale } from "src/config/scale";

import { quizModes } from "src/constants/consts";
import globalStyle from "src/theme/globalStyle";

type Props = {
    quizMode?: string,
    quizData?: any,
    score: any,
}

export default function SectionShareScore({
    quizMode = "",
    quizData = {},
    score = 0,
} : Props ) {
    const navigation: any = useNavigation();

    console.log(quizData);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `I just scored ${score} points in the quiz! Can you beat my score?`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with specific activity (e.g., email)
                    console.log(`Shared with activity: ${result.activityType}`);
                } else {
                    // shared via other means (e.g., iMessage, WhatsApp)
                    console.log("Shared successfully!");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed");
            }
        } catch (error) {
            console.log("Error sharing: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={globalStyle.margin16}/>
            <View style={styles.textContainer}>
                <Text style={styles.content}>
                    {`Share your success with all your friends ` + 
                    `and invite them to join and learn.`}
                </Text>
            </View>
            {/* <View style={styles.shareButtonContainer}>
                <PTFESquareButton
                    icon="telegram-plane"
                    size={scale(56)}
                    color="#7B68ED"
                    onClick={() => {}}
                />
                <PTFESquareButton
                    icon="facebook-f"
                    size={scale(56)}
                    color="#FFD967"
                    onClick={() => {}}
                />
                <PTFESquareButton
                    icon=""
                    size={scale(56)}
                    color="#FF6DAA"
                    onClick={() => {}}
                />
            </View> */}
            <View style={globalStyle.margin16}/>
            <View style={styles.buttonContainer}>
                <PTFEButton
                    type="rounded"
                    text={"Share Your Success"}
                    color="#87C6E8"
                    onClick={onShare}
                />
                <View style={globalStyle.margin8}/>
                <PTFEButton
                    type="rounded"
                    text={"Review Your Questions"}
                    color="#FF675B"
                    onClick={() => {
                        navigation.navigate("ReviewQA", {
                            quizData: quizData,
                            score: score,
                        });
                    }}
                />
            </View>
        </View>
    )
}
