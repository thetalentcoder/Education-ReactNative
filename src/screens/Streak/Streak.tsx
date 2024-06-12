import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Calendar } from "react-native-calendars"
import styles from "./StreakStyle";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'src/config/scale';
import { useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import SectionHeader from 'src/sections/Common/SectionHeader';


export default function Streak() {
    const { user } = useSelector((state) => state.userData);

    const navigation: any = useNavigation();

    const streakArr = user.streakhistory.map((item: any) => (item.date))

    const extractDateFromString = (datetimeString: string) => {
        return datetimeString.split('T')[0];
    };

    const allStreakDates = streakArr.map((date: string) => extractDateFromString(date))

    let markedDates = {};
    allStreakDates.forEach((date: string) => {
        markedDates[date] = {
            customStyles: {
                container: {
                    backgroundColor: '#FF675B',
                },
                text: { color: 'white' },
            },
        };
    });

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
                    <SectionHeader title="Streak" goBack={() => navigation.navigate('Dashboard')}/>
                </View>
                <View style={styles.statusContainer}>
                    <View style={styles.streakDetails}>
                        <View style={styles.longestMilstone}>
                            <FontAwesome5 name="flag" size={40} color="white" />
                            <Text style={styles.longestMilstoneText}>1X</Text>
                            <Text style={styles.streakDetailsDesp}>{"Score\nMultiplier"}</Text>
                        </View>
                        <View style={styles.split} />
                        <View style={styles.longestMilstone}>
                            <FontAwesome5 name="medal" size={40} color="white" />
                            <Text style={styles.longestMilstoneText}>6 days</Text>
                            <Text style={styles.streakDetailsDesp}>{"Time to next\nmilestone"}</Text>
                        </View>
                        <View style={styles.split} />
                        <View style={styles.longestMilstone}>
                            <FontAwesome5 name="medal" size={40} color="white" />
                            <Text style={styles.longestMilstoneText}>{user.streak} days</Text>
                            <Text style={styles.streakDetailsDesp}>{"Current\nStreak"}</Text>
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
                            textDisabledColor: '#d9e',
                            textMonthFontSize: moderateScale(13),
                            weekVerticalMargin: verticalScale(10),
                            textDayFontSize: moderateScale(13),
                            textDayHeaderFontSize: moderateScale(13),
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

