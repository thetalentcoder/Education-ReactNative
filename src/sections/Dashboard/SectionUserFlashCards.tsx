import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { useDispatch } from "react-redux";
import { rdx_setFlashCards } from "src/redux/userSlice";

import texts from "src/config/texts";
import { PTFEButton, PTFELinkButton } from "src/components/button";

import PartQuiz from "src/parts/Dashboard/PartQuiz";
import styles from "./SectionUserFlashCardsStyle";
import { getAllQuizData } from "src/actions/quiz/quiz";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteFlashCard, getAllFlashCards } from "src/actions/flashcard/flashcard";
import FlashcardQuiz from "src/parts/Dashboard/FlashcardQuiz";
import { moderateScale } from "src/config/scale";

type Props = {
    refresh?: boolean,
};

export default function SectionUserFlashCards({
    refresh
}: Props) {
    const [flashCardData, setFlashCardData] = useState<any>([]);
    const navigation: any = useNavigation();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [deleteItemId, setDeleteItemId] = useState('');

    const dispatch = useDispatch();


    useFocusEffect(
        useCallback(() => {
            fetchFlashCards();
        }, [])
    );

    useEffect(() => {
        fetchFlashCards();
    }, [refresh])

    const fetchFlashCards = useCallback(async () => {
        const data = await getAllFlashCards();
        console.log('gh', data.flashcards)
        setFlashCardData(data.flashcards);
        dispatch(rdx_setFlashCards(data.flashcards));
    }, []);

    const onDeleteHandler = async () => {
        try {
            await deleteFlashCard(deleteItemId);
            await fetchFlashCards();
            setIsDeleteModalVisible(false)
        } catch (error) {
            console.error("Failed to delete flashcard:", error);
        }
    }

    const onDeleteRequest = (id: string) => {
        setIsDeleteModalVisible(true)
        setDeleteItemId(id)
    }

    const renderQuizzes = () => {
        const quizzesRender = [];
        for (let i = 0; i < flashCardData.length; i += 2) {
            const firstQuiz: any = flashCardData[i];
            const secondQuiz: any = flashCardData[i + 1];

            quizzesRender.push(
                <View key={i} style={styles.row}>
                    <FlashcardQuiz
                        id={firstQuiz._id}
                        title={firstQuiz.title}
                        categoryTitle={firstQuiz.categoryTitle}
                        count={firstQuiz.questions.length}
                        onDelete={onDeleteRequest}
                    />
                    {secondQuiz && (
                        <FlashcardQuiz
                            id={secondQuiz._id}
                            title={secondQuiz.title}
                            categoryTitle={secondQuiz.categoryTitle}
                            count={secondQuiz.questions.length}
                            onDelete={onDeleteRequest}
                        />
                    )}
                </View>
            );
        }
        return quizzesRender;
    };

    const onPressDeleteModalCloseBtn = () => setIsDeleteModalVisible(false)

    return (
        <>
            {
                flashCardData.length > 0 &&
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>{texts.txt_screen_dashboard_title4}</Text>
                        {/* <PTFELinkButton
                            text="View All >"
                            color="#87C6E8"
                            underlined={false}
                            onClick={() => {

                            }}
                        /> */}
                    </View>
                    <View style={styles.quizzesContainer}>{renderQuizzes()}</View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isDeleteModalVisible}
                        onRequestClose={() => setIsDeleteModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={{ fontSize: moderateScale(15), textAlign: 'center' }}>
                                    Are you sure you want to delete this flashcard?
                                </Text>

                                <View style={styles.space1}>
                                    <PTFEButton
                                        text={"DELETE"}
                                        type="circle"
                                        color="#87C6E8"
                                        onClick={onDeleteHandler}
                                    />
                                </View>
                                <PTFEButton
                                    text="CLOSE"
                                    type="circle"
                                    color="#FF675B"
                                    onClick={onPressDeleteModalCloseBtn}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </>
    );
}