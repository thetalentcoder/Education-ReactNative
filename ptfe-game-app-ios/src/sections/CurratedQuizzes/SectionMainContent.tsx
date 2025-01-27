import React, { useCallback, useEffect, useState } from 'react'
import styles from "./SectionMainContentStyle";
import { ActivityIndicator, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getAllQuizData } from 'src/actions/quiz/quiz';
import PartQuiz from 'src/parts/Dashboard/PartQuiz';
import { useFocusEffect } from '@react-navigation/native';

export default function SectionMainContent({ navigation, }: any) {
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchQuizData();
        }, [])
    );

    const fetchQuizData = useCallback(async () => {
        setIsLoading(true)
        const quizData = await getAllQuizData();
        setQuizzes(quizData.quizzes);
        setIsLoading(false)
    }, []);

    const renderQuizzes = () => {
        const quizzesRender = [];
        for (let i = 0; i < quizzes.length; i += 2) {
            const firstQuiz: any = quizzes[i];
            const secondQuiz: any = quizzes[i + 1];

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
        <ScrollView style={styles.container}>
            <View style={styles.space}></View>
            {isLoading ? <ActivityIndicator size={50} color={"#FF675B"} /> :
                <View style={styles.quizzesContainer}>{renderQuizzes()}</View>
            }
        </ScrollView>
    )
}

