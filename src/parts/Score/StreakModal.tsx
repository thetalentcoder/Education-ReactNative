import React, { useEffect, useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { moderateScale } from "src/config/scale";
import styles from "./StreakModalStyle";
import { useSelector } from "react-redux";
import {
    format,
    parseISO,
    startOfWeek,
    endOfWeek,
    isWithinInterval,
    differenceInDays,
} from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { user_test_data } from "assets/@mockup/data";
import { PTFEButton } from "src/components/button";


const dailyStreakArr = [
    { day: "S", id: "Sunday" },
    { day: "M", id: "Monday" },
    { day: "T", id: "Tuesday" },
    { day: "W", id: "Wednesday" },
    { day: "T", id: "Thursday" },
    { day: "F", id: "Friday" },
    { day: "S", id: "Saturday" },
];

export default function StreakModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [streakDays, setStreakDays] = useState<any[]>([]);
    const [dayOfWeekForToday, setDayOfWeekForToday] = useState("");

    const { user } = useSelector((state) => state.userData);

    const UTCToZoneTIme = (dateString: string) => {
        const date = new Date(dateString);
        const offsetMinutes = date.getTimezoneOffset();

        const localTime = new Date(date.getTime() + offsetMinutes * 60 * 1000);
        return localTime;
    }

    const findConsecutiveStreaks = (dates: Date[]) => {
        let streaks = [];
        let currentStreak: Date[] = [];

        for (let i = 0; i < dates.length; i++) {
            if (currentStreak.length === 0) {
                currentStreak.push(dates[i]);
            } else {
                const previousDate = currentStreak[currentStreak.length - 1];
                if (differenceInDays(dates[i], previousDate) === 1) {
                    currentStreak.push(dates[i]);
                } else {
                    currentStreak = [dates[i]];
                }
            }
        }

        if (currentStreak.length >= 1) {
            streaks.push(currentStreak);
        }

        return streaks;
    };

    const getDayOfTheWeek = (date: Date) => {
        return format(date, "EEEE");
    };

    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const todaysDate = toZonedTime(new Date(), userTimeZone);

        setDayOfWeekForToday(format(todaysDate, "EEEE"));

        const currentWeekStart = toZonedTime(startOfWeek(new Date(), { weekStartsOn: 0 }), userTimeZone)
        const currentWeekEnd = toZonedTime(endOfWeek(new Date(), { weekStartsOn: 0 }), userTimeZone)

        const parseAllStreakDates = user?.streakhistory.map((item: any) =>
            UTCToZoneTIme(item.date)
        );

        const datesWithinCurrentWeek = parseAllStreakDates.filter((date) =>
            isWithinInterval(date, { start: currentWeekStart, end: currentWeekEnd })
        );

        const currentWeekStreaks = findConsecutiveStreaks(datesWithinCurrentWeek);

        setStreakDays(currentWeekStreaks.flat().map(getDayOfTheWeek));
    }, [user, setStreakDays, setDayOfWeekForToday]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const hideModalHandler = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isModalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.streakCount}>
                        <View style={[styles.icon, styles.icon2]}>
                            <FontAwesome5
                                name="fire-alt"
                                size={moderateScale(10)}
                                color="white"
                            />
                        </View>
                        <Text style={styles.streakCountText}>{user.streak}</Text>
                    </View>
                    <View style={styles.icon}>
                        <FontAwesome5
                            name="fire-alt"
                            size={moderateScale(60)}
                            color="white"
                        />
                    </View>
                    <View style={styles.streakBox}>
                        {dailyStreakArr.map((day) => (
                            <View style={styles.streakChild}>
                                <Text
                                    style={dayOfWeekForToday === day.id && styles.currentStreak}
                                >
                                    {day.day}
                                </Text>
                                <View
                                    style={[
                                        styles.icon,
                                        streakDays.includes(day.id)
                                            ? styles.icon3
                                            : styles.streakBoxNotChecked,
                                    ]}
                                >
                                    {streakDays.includes(day.id) && (
                                        <FontAwesome5
                                            name="check"
                                            size={moderateScale(21)}
                                            color="white"
                                        />
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.streakDescription}>
                        <Text style={styles.streakDescriptionHeader}>
                            {user.streak} day streak!
                        </Text>
                        <Text style={styles.streakDescriptionText}>
                            You're on fire! keep the flame lit every day, today was
                        </Text>
                    </View>
                    <PTFEButton
                        text="CONTINUE"
                        type="rounded"
                        color="#FF675B"
                        onClick={() => {setIsModalVisible(false)}}
                    />
                </View>
            </View>
        </Modal>
    );
}