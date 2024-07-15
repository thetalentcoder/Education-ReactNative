import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Calendar } from "react-native-calendars"
import styles from "./StreakStyle";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'src/config/scale';
import { useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import SectionHeader from 'src/sections/Common/SectionHeader';

import TimeLine from 'assets/icons/TimeLine';
import SpeedMeter from 'assets/icons/SpeedMeter';
import InformationIcon from 'assets/icons/InformationIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Streak() {
    const { user } = useSelector((state) => state.userData);
    const data = user?.milestones;

    const [remainDays, setRemainningDays] = useState(0);

    const navigation: any = useNavigation();
    const streakArr = user?.streakhistory?.map((item: any) => (item.date))

    const extractDateFromString = (datetimeString: string) => {
        return datetimeString.split('T')[0];
    };

    const allStreakDates = streakArr?.map((date: string) => extractDateFromString(date))

    let markedDates = {};
    allStreakDates?.forEach((date: string) => {
        markedDates[date] = {
            customStyles: {
                container: {
                    backgroundColor: '#FF675B',
                },
                text: { color: 'white' },
            },
        };
    });

    useEffect(() => {
        calculateRemainingDay();
    }, []);

    const calculateRemainingDay = useCallback(() => {
        const today = new Date();

        const achievedTasks = data.filter(item => item.achieved);

        let taskToCalculate;
        if (achievedTasks.length > 0) {
            taskToCalculate = achievedTasks[achievedTasks.length - 1];
        } else {
            taskToCalculate = data[0];
        }

        const taskDate = new Date(taskToCalculate.date);
        const diffTime = Math.abs(taskDate - today);
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        console.log({
            // ...taskToCalculate,
            remainingDays: remainingDays
        });

        setRemainningDays(remainingDays);
    }, []);

    const toInfoPage = useCallback((title?: string, content?: string) => {
        navigation.navigate("StreakInfo", { 
            title: title,
            content: content,
        });
    }, []);

    return (
        <View style={styles.modalContainer}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient>
            
            <ScrollView style={styles.innerContainer}>
                <View style={styles.headerContainer}>
                    <SectionHeader title="Streaks" goBack={() => navigation.navigate('Dashboard')}/>
                </View>
                <View style={styles.statusContainer}>
                    <View style={styles.streakDetails}>
                        <View style={styles.longestMilstone}>
                            {/* <FontAwesome5 name="flag" size={40} color="white" /> */}
                            <SpeedMeter />
                            <Text style={styles.streakDetailsDesp}>{"Score\nMultiplier"}</Text>
                            <Text style={styles.longestMilstoneText}>{user?.currentMultiplier}x</Text>
                            <View style={styles.infoIcon}>
                                <TouchableOpacity 
                                    style={styles.infoButton}
                                    onPress={()=> {
                                        toInfoPage("Score Multiplier", 
                                            "It is the multiplier value for calculating scores in the quiz mode.");
                                    }}
                                >
                                    <InformationIcon/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.split} />
                        <View style={styles.longestMilstone}>
                            {/* <FontAwesome5 name="medal" size={40} color="white" /> */}
                            <TimeLine />
                            <Text style={styles.streakDetailsDesp}>{"Time to next\nmilestone"}</Text>
                            <Text style={styles.longestMilstoneText}>{remainDays} days</Text>
                            <View style={styles.infoIcon}>
                                <TouchableOpacity 
                                    style={styles.infoButton}
                                    onPress={()=> {
                                        toInfoPage("Time To Next Milestone",
                                            "It shows the remaining days to achieve next milestone."
                                        );
                                    }}
                                >
                                    <InformationIcon/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.split} />
                        <View style={styles.longestMilstone}>
                            <FontAwesome5
                                name="fire-alt"
                                size={moderateScale(38)}
                                color="white"
                            />
                            <Text style={styles.streakDetailsDesp}>{"Current\nStreak"}</Text>
                            <Text style={styles.longestMilstoneText}>{user?.streak} days</Text>
                            <View style={styles.infoIcon}>
                                <TouchableOpacity 
                                    style={styles.infoButton}
                                    onPress={()=> {
                                        toInfoPage("Current Streak",
                                            "It shows the current streak days."
                                        );
                                    }}
                                >
                                    <InformationIcon/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.mainContent}>
                    <Calendar
                        markingType={'custom'}
                        style={styles.calendar}
                        markedDates={markedDates}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: 'grey',
                            textMonthFontSize: moderateScale(22),
                            weekVerticalMargin: verticalScale(10),
                            // textDayFontSize: moderateScale(13),
                            // textDayHeaderFontSize: moderateScale(13),
                            textDayHeaderFontWeight: "bold",
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

