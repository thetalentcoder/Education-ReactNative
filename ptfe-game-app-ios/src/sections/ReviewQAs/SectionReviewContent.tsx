import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from "react-native";

import PartAnswer from "./PartAnswer";
import styles from "./SectionReviewContentStyle";
import HTMLView from "react-native-htmlview";
import { PTFEButton } from "src/components/button";

type Props = {
    quizData?: any,
    quizMode: any,
    scrollRef?: any,
};

export default function SectionReviewContent({
    quizData,
    quizMode,
    scrollRef,
}: Props) {
    const [positions, setPositions] = useState<number[]>([]);
    const [scenarioModalVisible, setScenarioModalVisible] = useState(false);
    const [scenario, setScenario] = useState('');
    console.log("this is reviewQA page", scenario);

    const handleLayout = useCallback((index: number, y: number ) => {
        setPositions(prev => {
            const newPos = [...prev];
            newPos[index] = y;
            return newPos;
        });
    }, [setPositions])

    const handlePress = useCallback((index: number) => {
        if (scrollRef.current && positions[index] !== undefined) {
            scrollRef.current?.scrollTo({ y: positions[index] - 75, animated: true });
        }
    }, [positions])
    const items = quizData?.map((item: any, index: number) => {

        let correctF = false;
        for (let i = 0; i < item?.answers?.length; i++) {
            // if (item?.answers[i]?.enabled === true &&
            //     item?.answers[i]?.enabled === item?.answers[i]?.correct) {
            if (item?.answers[i]?.enabled === true && item?.answers[i]?.correct === true){
                correctF = true;
                break;
            }
        }

        return {
            id: index + 1,
            color: correctF ? '#44D95B' : '#FF675B',
        };
    });


    return (
        <View style={styles.container}>
            <View style={styles.problemSquareContainer}>
                {
                    items?.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.item, { backgroundColor: item.color }]}
                            onPress={() => handlePress(index)}
                        >
                            <Text style={styles.itemText}>{item.id}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <ScrollView>
                {
                    quizData?.map((item: any, index: number) => (
                        <View key={index}>
                            {index !== 0 && <View style={styles.lineContainer}></View>}
                            <View
                                style={styles.quizContainer}
                                onLayout={event => {
                                    console.log("ReLayout!!!");
                                    event.target.measure((x, y, width, height, pageX, pageY) => {
                                        
                                        handleLayout(index, y + pageY);
                                    });
                                  }}
                            >
                                <Text style={styles.rationaleHeader}>
                                    {`Question ${index + 1}:`}
                                </Text>
                                <Text style={styles.questionText}>
                                    {item?.question}
                                </Text>
                                <PTFEButton
                                    text="Show Scenario"
                                    type="rounded"
                                    color="#FF675B"
                                    enabled={false}
                                    onClick={() => {
                                        setScenario(item.scenario);
                                        setScenarioModalVisible(true);
                                    }}
                                />
                            </View>
                            <View style={styles.answersContainer}>
                                <Text style={styles.rationaleHeader}>
                                    {"Answer: "}
                                </Text>
                                {
                                    item?.answers?.map((item: any, index: number) => {
                                        return (
                                            <PartAnswer
                                                key={index}
                                                index={item?.index}
                                                content={item?.content}
                                                correct={item?.correct}
                                                mine={item?.enabled}
                                                clickable={false}
                                                enabled={false}  
                                                onClick={() => { } }
                                            />
                                        )
                                    })
                                }
                            </View>

                            <View style={styles.rationaleContainer}>
                                <Text style={styles.rationaleHeader}>
                                    {"Answer: "}
                                </Text>
                                <Text style={styles.rationaleText}>
                                    {item.answerExplanation}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={scenarioModalVisible}
                onRequestClose={() => setScenarioModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                <TouchableWithoutFeedback
                    onPress={() => setScenarioModalVisible(false)}
                >
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>{`  Scenario`}</Text>
                    {/* <Text style={styles.title}>{scenario}</Text> */}
                    <HTMLView value={scenario} />
                    <View style={styles.space8}></View>
                    </ScrollView>
                    <View style={styles.space16}></View>
                    <PTFEButton
                    text="CLOSE"
                    type="circle"
                    color="#FF675B"
                    onClick={() => {
                        setScenarioModalVisible(false);
                    }}
                    />
                </View>
                </View>
            </Modal>
        </View>
    )
}
