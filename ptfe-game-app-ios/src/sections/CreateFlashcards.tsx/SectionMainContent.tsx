import React, { useEffect, useState } from 'react'
import styles from "./SectionMainContentStyle";
import { Button, FlatList, KeyboardAvoidingView, Modal, Platform, Text, TextInput, View } from 'react-native';
import { PTFEButton, PTFELinkButton } from 'src/components/button';
import { createFlashcard, editFlashCard, getFlashCard } from 'src/actions/flashcard/flashcard';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'src/config/scale';

export default function SectionMainContent({ navigation, titleValue, id, page }: any) {
    const [title, setTitle] = useState(titleValue);
    const [questions, setQuestions] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentExplanation, setCurrentExplanation] = useState('');
    const isEditPage = page == "edit" ? true : false;
    const [isEditModal, setIsEditModal] = useState(false)
    const [editItemIndex, setEditItemIndex] = useState(0)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

    useEffect(() => {
        getData()
    }, [])


    const addQuestion = () => {
        if (isEditModal) {
            setQuestions((prevQuestions: any[]) =>
                prevQuestions.map((item: any, i: number) =>
                    i === editItemIndex ? { ...item, question: currentQuestion, answerExplanation: currentExplanation } : item
                )
            );
        } else {
            setQuestions([...questions, { question: currentQuestion, answerExplanation: currentExplanation }]);
        }

        setModalVisible(false);
        setCurrentQuestion('');
        setCurrentExplanation('');
    };

    const getData = async () => {
        const result = await getFlashCard(id)
        setQuestions(result.flashcard.questions)
    }

    const submitData = async () => {
        const data = {
            title,
            questions
        };

        try {
            if (isEditPage) {
                await editFlashCard(title, questions, id)

            } else {
                await createFlashcard(title, questions)
            }
            navigation.navigate('Dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    const onEditHandler = (index: number) => {
        setIsEditModal(true)
        setEditItemIndex(index)
        setCurrentQuestion(questions[index].question)
        setCurrentExplanation(questions[index].answerExplanation)
        setModalVisible(true)
    }

    const onDeleteHandler = (index: number) => {
        setQuestions((prevQuestions: any) => prevQuestions.filter((_: any, i: number) => i !== index));
    }


    const onPressAddQuestionBtn = () => setModalVisible(true)
    const onPressModalCloseBtn = () => setModalVisible(false)
    const onPressDeleteModalOpenBtn = () => setIsDeleteModalVisible(true)
    const onPressDeleteModalCloseBtn = () => setIsDeleteModalVisible(false)
    return (
        <KeyboardAvoidingView
        style={styles.keyboardcontainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.container}>
            <View style={styles.space}></View>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                editable={isEditPage ? true : false}
            />
            <View style={styles.space}>
                <PTFEButton
                    text="ADD QUESTIONS"
                    type="rounded"
                    color="#87C6E8"
                    onClick={onPressAddQuestionBtn}
                />
            </View>

            {questions.length > 0 && (
                // <FlatList
                //     data={questions}
                //     keyExtractor={(item, index) => index.toString()}
                //     renderItem={({ item }) => (
                //         <View style={styles.questionContainer}>
                //             <Text style={styles.title}>Question:</Text>
                //             <Text style={styles.content}>{`${item.question}\n`}</Text>

                //             <Text style={styles.title}>Answer:</Text>
                //             <Text style={styles.content}>{`${item.answer}\n`}</Text>

                //             <Text style={styles.title}>Explanation:</Text>
                //             <Text style={styles.content}>{`${item.answerExplanation}`}</Text>
                //         </View>
                //     )}
                // />
                questions.map((item: any, index: number) => {
                    return (
                        <View style={styles.questionContainer} key={index}>
                            <Text style={styles.title}>Question:</Text>
                            <Text style={styles.content}>{`${item.question}\n`}</Text>

                            <Text style={styles.title}>Explanation:</Text>
                            <Text style={styles.content}>{`${item.answerExplanation}`}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingTop: moderateScale(8) }}>
                                <PTFELinkButton
                                    text={"Edit"}
                                    color="#0000FF"
                                    underlined={false}
                                    onClick={() => onEditHandler(index)}
                                />
                                <PTFELinkButton
                                    text="Remove"
                                    color="#FF0000"
                                    underlined={false}
                                    onClick={onPressDeleteModalOpenBtn}
                                />
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isDeleteModalVisible}
                                onRequestClose={() => setIsDeleteModalVisible(false)}
                            >
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <Text style={{ fontSize: moderateScale(15), textAlign: 'center' }}>
                                            Are you sure you want to delete this question?
                                        </Text>

                                        <View style={styles.space1}>
                                            <PTFEButton
                                                text={"DELETE"}
                                                type="circle"
                                                color="#87C6E8"
                                                onClick={() => onDeleteHandler(index)}
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
                    )
                })
            )}
            <View style={styles.space}>
                <PTFEButton
                    text={isEditPage ? "UPDATE" : "Submit"}
                    type="rounded"
                    color="#FF675B"
                    onClick={submitData}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                        <KeyboardAvoidingView
        style={styles.keyboardcontainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.questionInput}
                            placeholder="Question"
                            value={currentQuestion}
                            onChangeText={setCurrentQuestion}
                            multiline
                        />
                        <TextInput
                            style={styles.textArea}
                            placeholder="Answer"
                            value={currentExplanation}
                            onChangeText={setCurrentExplanation}
                            multiline
                        />

                        <View style={styles.space1}>
                            <PTFEButton
                                text={isEditPage ? "SAVE" : "ADD"}
                                type="circle"
                                color="#87C6E8"
                                onClick={addQuestion}
                            />
                        </View>
                        <PTFEButton
                            text="CLOSE"
                            type="circle"
                            color="#FF675B"
                            onClick={onPressModalCloseBtn}
                        />
                    </View>
                </View>
                </KeyboardAvoidingView>
            </Modal>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

