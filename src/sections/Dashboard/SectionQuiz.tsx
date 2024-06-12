import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import texts from "src/config/texts";
import { PTFELinkButton } from "src/components/button";

import PartQuiz from "src/parts/Dashboard/PartQuiz";
import styles from "./SectionQuizStyle";
import { getAllQuizData } from "src/actions/quiz/quiz";

type Props = {
    refresh?: boolean,
};

export default function SectionQuiz({
    refresh
}: Props) {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizData();
    }, [refresh]);

    const fetchQuizData = useCallback(async () => {
        const quizData = await getAllQuizData();
        setQuizzes(quizData.quizzes);
    }, []);

    const renderQuizzes = () => {
        const quizzesRender = [];
        for (let i = 0; i < quizzes.length; i += 2) {
            const firstQuiz:any = quizzes[i];
            const secondQuiz:any = quizzes[i + 1];

            quizzesRender.push(
                <View key={i} style={styles.row}>
                    <PartQuiz
                        id={firstQuiz._id}
                        title={firstQuiz.title}
                        categoryTitle={firstQuiz.categoryTitle}
                        count={firstQuiz.questions.length}
                    />
                    {secondQuiz && (
                        <PartQuiz
                            id={secondQuiz._id}
                            title={secondQuiz.title}
                            categoryTitle={secondQuiz.categoryTitle}
                            count={secondQuiz.questions.length}
                        />
                    )}
                </View>
            );
        }
        return quizzesRender;
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{texts.txt_screen_dashboard_title2}</Text>
                <PTFELinkButton
                    text="View All >"
                    color="#87C6E8"
                    underlined={false}
                    onClick={() => {}}
                />
            </View>
            <View style={styles.quizzesContainer}>{renderQuizzes()}</View>
        </View>
    );
}