import React from "react";
import { View, Text } from "react-native";
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
                    onClick={() => {}}
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