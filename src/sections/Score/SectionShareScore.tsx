import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./SectionShareScoreStyle";
import { PTFEButton, PTFESquareButton } from "src/components/button";
import { scale } from "src/config/scale";

import { quizModes } from "src/constants/consts";

type Props = {
    quizMode?: number,
    quizData?: any,
}

export default function SectionShareScore({
    quizMode = 0,
    quizData = {}
} : Props ) {
    const navigation: any = useNavigation();

    console.log(quizData);
    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.content}>
                    {`Share your success with all your friends\n` + 
                    `and invite them to join and learn.`}
                </Text>
            </View>
            <View style={styles.shareButtonContainer}>
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
            </View>
            <View style={styles.buttonContainer}>
                <PTFEButton
                    type="rounded"
                    text={ quizMode == quizModes.classicMode ? "REVIEW YOUR QUESTIONS" : "SHARE" }
                    color="#FF675B"
                    onClick={ quizMode == quizModes.classicMode 
                        ? () => {
                            navigation.navigate("ReviewQA", {
                                quizData: quizData,
                            });
                        } 
                        : () => {

                        }}
                />
            </View>
        </View>
    )
}