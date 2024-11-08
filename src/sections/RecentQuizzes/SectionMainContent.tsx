import React, { useCallback, useEffect, useState } from 'react'
import styles from "./SectionMainContentStyle";
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { moderateScale, scale } from 'src/config/scale';
import FlashCardIcon from 'assets/icons/FlashCardIcon';
import StudyModeIcon from 'assets/icons/StudyModeIcon';
import ClassicModeIcon from 'assets/icons/ClassicModeIcon';
import SurvivorModeIcon from 'assets/icons/SurvivorModeIcon';
import ScenarioModeIcon from 'assets/icons/ScenarioModeIcon';

export default function SectionMainContent({ navigation, gamehistory}: any) {
    console.log("Game History" + gamehistory);

    return (
        <View style={styles.container}>
            <ScrollView style={{ paddingTop: scale(32), paddingHorizontal: moderateScale(20) }}>
            {
                gamehistory?.slice(-10).reverse().map((col, index) => {
                    let color = ''
                    switch (col.title) {
                        case "Classic Mode":
                            color = "#8270F6";
                            break;
                        case "Survivor Mode":
                            color = "#FFD967";
                            break;
                        case "Scenario Mode":
                            color = "#FF6DAA";
                            break;
                        default:
                            color = "#A0A0A2";
                    }
                    return (
                        <View
                            key={index}
                            style={styles.oneQuiz}
                        >
                            <View style={[styles.icon, { backgroundColor: color }]}>
                                {col.title == "FlashCards" ? (
                                    <FlashCardIcon />
                                    ) : col.title == "Study Mode" ? (
                                        <StudyModeIcon />
                                    ) : col.title == "Classic Mode" ? (
                                        <ClassicModeIcon />
                                    ) : col.title == "Survivor Mode" ? (
                                        <SurvivorModeIcon />
                                    ) : col.title == "Scenario Mode" ? (
                                        <ScenarioModeIcon />
                                    ) : col.title == "Text Quiz 2" ? (
                                        <FlashCardIcon />
                                    ) : col.title == "Test Quiz 1" ? (
                                        <FlashCardIcon />
                                    ) : col.title == "Test Quiz 3" ? (
                                        <FlashCardIcon />
                                    ) : col.title == "Test Quiz 4" ? (
                                        <FlashCardIcon />
                                    ) : (
                                        <></>
                                )}
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.titleText}>
                                    {col.title}
                                </Text>
                                <View style={styles.column}>
                                    <Text style={styles.smallText}>
                                        { col.numberOfQuestions == 1 ? `${col.numberOfQuestions} Question` : `${col.numberOfQuestions} Questions`}
                                    </Text>
                                    {/* <Text style={styles.smallText} numberOfLines={1} ellipsizeMode="tail">
                                        {col.category}
                                    </Text> */}
                                </View>
                            </View>
                            <View style={[styles.percentContainer]}>
                                <Text
                                    style={[styles.percentText, { color: color }]} >
                                    {col.score}
                                </Text>
                            </View>
                        </View>
                    )
                })
            }
            </ScrollView>
        </View>
    )
}

