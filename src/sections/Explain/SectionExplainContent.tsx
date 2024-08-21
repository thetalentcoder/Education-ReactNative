import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import PartAnswer from "./PartAnswer";
import styles from "./SectionExplainContentStyle";

type Props = {
    answers: any,
    rationale: string,
};

export default function SectionExplainContent({
    answers = {},
    rationale = '',
}: Props) {
    console.log(answers);

    return (
        <View style={styles.container}>
            <View style={styles.answersContainer}>
                <Text style={styles.rationaleHeader}>
                    {"Correct Answer: "}
                </Text>
                {
                    answers.map((item: any, index: number) => {
                        return (
                            <PartAnswer
                                key={index}
                                index={item.index}
                                content={item.content}
                                correct={item.correct}
                                mine={item.mine}
                                clickable={false}
                                onClick={() => {}}
                            />
                        )
                    })
                }
            </View>
            <View style={styles.quizContainer}>
                <Text style={styles.rationaleHeader}>
                    {"Answer Explanation:"}
                </Text>
                <Text style={styles.questionText}>
                    {`${rationale}`}
                </Text>
            </View>
        </View>
    )
}