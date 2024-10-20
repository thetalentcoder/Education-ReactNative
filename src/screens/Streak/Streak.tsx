import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from './StreakStyle';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'src/config/scale';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import SectionHeaderX from 'src/sections/Common/SectionHeaderX';
import TimeLine from 'assets/icons/TimeLine';
import SpeedMeter from 'assets/icons/SpeedMeter';
import InformationIcon from 'assets/icons/InformationIcon';
import moment from 'moment';

export default function Streak() {
  const { user } = useSelector((state) => state.userData);
  const data = user?.milestones;
  const [remainDays, setRemainningDays] = useState(0);

  // For Calendar
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));

  const onMonthChange = useCallback((month: { dateString: string; }) => {
    setSelectedMonth(month.dateString.slice(0, 7));
  }, [setSelectedMonth]);

  const isCurrentMonth = useMemo(() => selectedMonth === currentMonth, [selectedMonth, currentMonth]);

  const navigation = useNavigation();
  const streakArr = user?.streakhistory?.map((item: { date: any; }) => item?.date);
  const extractDateFromString = (datetimeString: string) => datetimeString.split('T')[0];
  const allStreakDates = streakArr?.map((date: any) => extractDateFromString(date));

  let markedDates = {};
  allStreakDates?.forEach((date: string | number) => {
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
    const achievedTasks = data.filter((item: { achieved: any; }) => item.achieved);
    let taskToCalculate = achievedTasks.length > 0 ? achievedTasks[achievedTasks.length - 1] : data[0];
    const taskDate = new Date(taskToCalculate?.date);
    const diffTime = Math.abs(taskDate - today);
    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setRemainningDays(remainingDays);
  }, [data]);

  const goToPrevMonth = useCallback(() => {
    setSelectedMonth((prevMonth) => moment(prevMonth).subtract(1, 'month').format('YYYY-MM'));
  }, []);
  
  const goToNextMonth = useCallback(() => {
    setSelectedMonth((prevMonth) => moment(prevMonth).add(1, 'month').format('YYYY-MM'));
  }, []);

  const toInfoPage = useCallback((title: any, content: any) => {
    navigation.navigate('StreakInfo', { title, content });
  }, [navigation]);

  return (
    <View style={styles.modalContainer}>
      <LinearGradient
        colors={['#FF675B', '#87C6E8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        style={styles.upperGradientContainer}
      />
      <ScrollView style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <SectionHeaderX title="Ninja Streaks" goBack={() => navigation.navigate('Dashboard')} />
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.streakDetails}>
            <View style={styles.longestMilstone}>
              <FontAwesome5 name="fire-alt" size={moderateScale(38)} color="white" style={{marginTop: moderateScale(20), marginBottom: moderateScale(10)}}/>
              <Text style={styles.streakDetailsDesp}>{"Current\nStreak"}</Text>
              <Text style={styles.longestMilstoneText}>{user?.streak} {user?.streak > 1 ? "days" : "day"}</Text>
              <View style={styles.infoIcon}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => {
                    toInfoPage("Current Streak", "It shows the current streak days.");
                  }}
                >
                  <InformationIcon />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.split} />
            <View style={styles.longestMilstone}>
              <TimeLine />
              <Text style={styles.streakDetailsDesp}>{"Time to Next\nMultiplier"}</Text>
              <Text style={styles.longestMilstoneText}>{remainDays} {remainDays > 1 ? "days" : "day"}</Text>
              <View style={styles.infoIcon}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => {
                    toInfoPage("Time To Next Milestone", "It shows the remaining days to achieve next milestone.");
                  }}
                >
                  <InformationIcon />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.split} />
            <View style={styles.longestMilstone}>
              <SpeedMeter />
              <Text style={styles.streakDetailsDesp}>{"Score\nMultiplier"}</Text>
              <Text style={styles.longestMilstoneText}>{user?.currentMultiplier}x</Text>
              <View style={styles.infoIcon}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => {
                    toInfoPage("Score Multiplier", "It is the multiplier value for calculating scores in the quiz mode.");
                  }}
                >
                  <InformationIcon />
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
              textDayHeaderFontWeight: 'bold',
              arrowColor: "#87C6F8",
              disabledArrowColor: "#FFF",
            }}
            current={selectedMonth}
            onMonthChange={onMonthChange}
            disableArrowRight={isCurrentMonth}
          />
        </View>
      </ScrollView>
    </View>
  );
}
