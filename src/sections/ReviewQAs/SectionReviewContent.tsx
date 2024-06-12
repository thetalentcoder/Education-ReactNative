import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import PartAnswer from "./PartAnswer";
import styles from "./SectionReviewContentStyle";

type Props = {
    quizData?: any,
};

export default function SectionReviewContent({
    quizData,
}: Props) {
    const items = quizData?.map((item: any, index: number) => {
        let correctF = false;
        console.log(item);
        for (let i = 0; i < item?.answers?.length; i ++) {
            if (item?.answers[i]?.enabled == true && 
                item?.answers[i]?.enabled == item?.answers[i]?.correct) {
                correctF = true;
                break;
            }
        }
        
        return {
            id: index + 1,
            color: correctF ? '#74F97B' : '#FF675B',
        }
    });

    console.log(items);

    return (
        <View style={styles.container}>
            <View style={styles.problemSquareContainer}>
                {
                    items.map((item) => (
                        <TouchableOpacity key={item.id} style={[styles.item, { backgroundColor: item.color }]}>
                            <Text style={styles.itemText}>{item.id}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            {
                quizData.map((item: any, index: number) => (
                    <>
                        { index != 0 && <View style={styles.lineContainer}></View> }
                        <View style={styles.quizContainer}>
                            <Text style={styles.rationaleHeader}>
                                {"Question: "}
                            </Text>
                            <Text style={styles.questionText}>
                                {item?.question}
                            </Text>
                        </View>
                        <View style={styles.answersContainer}>
                            <Text style={styles.rationaleHeader}>
                                {"Answer: "}
                            </Text>
                            {
                                item?.answers.map((item: any, index: number) => {
                                    return (
                                        <PartAnswer
                                            key={index}
                                            index={item?.index}
                                            content={item?.content}
                                            correct={item?.correct}
                                            mine={item?.enabled}
                                            clickable={false}
                                            onClick={() => {}}
                                        />
                                    )
                                })
                            }
                        </View>
                        
                        <View style={styles.rationaleContainer}>
                            <Text style={styles.rationaleHeader}>
                                {"Answer Explanation: "}
                            </Text>
                            <Text style={styles.rationaleText}>
                                {item.answerExplanation}
                            </Text>
                        </View>
                    </>
                ))
            }
        </View>
    )
}