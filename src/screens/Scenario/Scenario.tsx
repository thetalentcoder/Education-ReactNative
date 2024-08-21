import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, View, Text, ScrollView } from "react-native";

import SectionStatus from "src/sections/Scenario/SectionStatus";
import SectionMainContent from "src/sections/Scenario/SectionMainContent";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import styles from "./ScenarioStyle";
import { PTFELoading } from "src/components/loading";

import { survivalLife } from "src/constants/consts";
import { LinearGradient } from "expo-linear-gradient";
import { PTFEButton } from "src/components/button";
import { moderateScale } from "src/config/scale";

type Props = {
    route?: any;
    navigation?: any;
}

export default function Scenario({
    route,
    navigation,
}: Props) {
    const [quizID, setQuizID] = useState(route.params?.quizID);
    const [topic, setTopic] = useState(route.params?.quizID);
    const refresh = route.params?.refresh;

    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    useEffect(() => {
        const quizID = route.params?.quizID;
        setQuizID(quizID);
    }, [route]);

    useEffect(() => {
        setCurrentLife(survivalLife);
        if (quizID == undefined) {
            gotoDashboard();
        }
    }, [quizID]);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentProbNumber, setCurrentProbNumber] = useState(0);
    const [currentLife, setCurrentLife] = useState(survivalLife);
    const [totalProbCount, setTotalProbCount] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);

    const [closeModalVisible, setCloseModalVisible] = useState(false);
    const [TopicsModalVisible, setTopicsModalVisible] = useState(false);

    const scrollRef = useRef<ScrollView>(null);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollRef}
                style={{width: "100%"}}
            >
                <LinearGradient
                    colors={['#FF675B', '#87C6E8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.upperGradientContainer}
                />
                <View style={styles.headerContainer}>
                    <SectionHeaderX
                        title={"Scenarios Mode"}
                        goBack={() => setCloseModalVisible(true)}
                    />
                </View>
                <View style={styles.statusContainer}>
                    <SectionStatus
                        currentProbNumber={currentProbNumber}
                        totalProbCount={totalProbCount}
                        currentScore={currentScore}
                        topics={topic}
                        setTopicsModalVisible={setTopicsModalVisible}
                    />
                </View>
                <View style={styles.mainContent}>
                    <SectionMainContent
                        quizID={quizID}
                        setCurrentProbNumber={setCurrentProbNumber}
                        refresh={(refresh == true) ? true : false}
                        setDataLoadedFlag={setDataLoaded}
                        setCurrentLife={setCurrentLife}
                        setTotalProbCount={setTotalProbCount}
                        setCurrent={setCurrentScore}
                        topic={topic}
                        timerPaused={closeModalVisible || TopicsModalVisible}
                        scrollRef={scrollRef}
                    />
                </View>

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
            </ScrollView>
        </View>
    )
}