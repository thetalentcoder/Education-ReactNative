import React, { useCallback, useEffect, useState, useRef } from "react";
import { Modal, View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import SectionStatus from "src/sections/Study/SectionStatus";
import SectionMainContent from "src/sections/Study/SectionMainContent";
import SectionHeader from "src/sections/Common/SectionHeader";
import texts from "src/config/texts";
import styles from "./StudyStyle";
import { PTFELoading } from "src/components/loading";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import { moderateScale } from "src/config/scale";
import { PTFEButton } from "src/components/button";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Study({
    route,
    navigation,
}: Props) {
    const [quizID, setQuizID] = useState(route.params?.quizID);
    const [topics, setTopics] = useState(route.params?.quizID);
    const [numberOfQuestions, setNumberofQuestions] = useState(route.params?.numberOfQuestions);
    
    const refresh = route.params?.refresh;
    const nextQuestion = route.params?.nextQuestion;

    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentProbNumber, setCurrentProbNumber] = useState(0);
    const [totalProbCount, setTotalProbCount] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);

    const [closeModalVisible, setCloseModalVisible] = useState(false);
    const scrollRef = useRef<ScrollView>(null);
    const [quizState, setQuizState] = useState(0);

    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    useEffect(() => {
        const quizID = route.params?.quizID;
        setQuizID(quizID);
    }, [route]);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={{ flexGrow: 1 }}
                onContentSizeChange={() => { if (quizState == 2) {scrollRef.current?.scrollToEnd()}}}
            >
                <LinearGradient
                    colors={['#FF675B', '#87C6E8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.upperGradientContainer}
                />
                <View style={styles.headerContainer}>
                    <SectionHeaderX
                        title={"Study Mode"}
                        goBack={() => {setCloseModalVisible(true)}}
                    />
                </View>
                <View style={styles.statusContainer}>
                    <SectionStatus
                        currentProbNumber={currentProbNumber}
                        totalProbCount={totalProbCount}
                        currentScore={currentScore}
                        topics={topics}
                    />
                </View>
                <View style={styles.mainContent}>
                    <SectionMainContent
                        quizID={quizID}
                        numberOfQuestions={numberOfQuestions}
                        refresh={(refresh == true) ? true : false}
                        nextQuestion={(nextQuestion == true) ? true : false}
                        setCurrentProbNumber={setCurrentProbNumber}
                        setTotalProbCount={setTotalProbCount}
                        setDataLoadedFlag={setDataLoaded}
                        setCurrent={setCurrentScore}
                        topics={topics}
                        scrollRef={scrollRef}
                        setCurrentQuizState={setQuizState}
                    />
                </View>
            </ScrollView>

            {!dataLoaded && <PTFELoading />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={closeModalVisible}
                onRequestClose={() => setCloseModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{fontSize: moderateScale(20), fontFamily: "circular-std-medium", textAlign: 'center'}}>
                            {`\nAre you sure you want to exit your game?\nYour progress will be lost.\n`}
                        </Text>

                        <View style={styles.space1}>
                            <PTFEButton
                                text={"No, let's continue"}
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => setCloseModalVisible(false)}
                            />
                        </View>
                        <PTFEButton
                            text="Yes I'm sure"
                            type="rounded"
                            color="#FF675B"
                            onClick={() => {
                                setCloseModalVisible(false);
                                gotoDashboard();
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}