import React from "react";
import { View, Text } from "react-native";

import styles from "./PartRecentQuizzesStyle";
import { PTFELinkButton } from "src/components/button";

const data = [
    {
        color: "#8270F6",
        percent: "80%",
        title: "Biology and Science",
        qCount: 13,
    },
    {
        color: "#FFD967",
        percent: "90%",
        title: "Math Statistics",
        qCount: 15,
    },
    {
        color: "#FF6DAA",
        percent: "100%",
        title: "Art and Music",
        qCount: 21,
    },
    {
        color: "#A0A0A2",
        percent: "70%",
        title: "Japanese Language",
        qCount: 6,
    },
    {
        color: "#FF6DAA",
        percent: "100%",
        title: "Art and Music",
        qCount: 12,
    },
    {
        color: "#FFD967",
        percent: "90%",
        title: "Math Statistics",
        qCount: 8,
    },
    {
        color: "#A0A0A2",
        percent: "70%",
        title: "Japanese Language",
        qCount: 10,
    },
];

export default function PartRecentQuizzes() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>
                    Recent Quizzes
                </Text>
                <PTFELinkButton
                    text="View All >"
                    color="#87C6E8"
                    underlined={false}
                    onClick={() => {}}
                />
            </View>
            {
                data.map((col, index) => {
                    return (
                        <View 
                            key={index}
                            style={styles.oneQuiz}
                        >
                            <View style={[styles.icon, {backgroundColor: col.color}]}>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.titleText}>
                                    {col.title}
                                </Text>
                                <View style={styles.row}>
                                    <Text style={styles.smallText}>
                                        {`${col.qCount} Question`}
                                    </Text>
                                    <Text style={styles.smallText}>
                                        {"All Topics"}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.percentContainer, {borderColor: col.color}]}>
                                <Text style={[styles.percentText, {color: col.color}]}>
                                    {col.percent}
                                </Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}