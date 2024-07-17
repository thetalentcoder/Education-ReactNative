import React, { useEffect, useState } from "react";
import { Modal, View, Text, Pressable } from "react-native";
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
    subDays,
} from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { user_test_data } from "assets/@mockup/data";
import { PTFEButton } from "src/components/button";

type Props = {
    bShow: boolean;
    goToScorePage: () => void
}

export default function StreakModal({
    bShow = true,
    goToScorePage,
}: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [streakDays, setStreakDays] = useState<any[]>([]);
    const [dynamicStreakArr, setDynamicStreakArr] = useState<any[]>([]);

    const { user } = useSelector((state) => state.userData);

    const UTCToZoneTIme = (dateString: string) => {
        const date = new Date(dateString);
        const offsetMinutes = date.getTimezoneOffset();
        const localTime = new Date(date.getTime() + offsetMinutes * 60 * 1000);
        return localTime;
    }

    // const findConsecutiveStreaks = (dates: Date[]) => {
    //     let streaks = [];
    //     let currentStreak: Date[] = [];

    //     for (let i = 0; i < dates.length; i++) {
    //         if (currentStreak.length === 0) {
    //             currentStreak.push(dates[i]);
    //         } else {
    //             const previousDate = currentStreak[currentStreak.length - 1];
    //             if (differenceInDays(dates[i], previousDate) === 1) {
    //                 currentStreak.push(dates[i]);
    //             } else {
    //                 currentStreak = [dates[i]];
    //             }
    //         }
    //     }

    //     if (currentStreak.length >= 1) {
    //         streaks.push(currentStreak);
    //     }

    //     return streaks;
    // };

    const getDayOfTheWeek = (date: Date) => {
        return format(date, "EEEE");
    };

    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const todaysDate = toZonedTime(new Date(), userTimeZone);
        const formattedToday = format(todaysDate, "EEEE");

        // Create an array with the last 7 days including today
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(todaysDate, 6 - i);
            return {
                day: format(date, "EEE"), // Get the first letter of the day
                id: format(date, "EEEE"), // Full name of the day
            };
        });

        setDynamicStreakArr(last7Days);

        // const currentWeekStart = toZonedTime(startOfWeek(new Date(), { weekStartsOn: 0 }), userTimeZone)
        // const currentWeekEnd = toZonedTime(endOfWeek(new Date(), { weekStartsOn: 0 }), userTimeZone)

        const parseAllStreakDates = user?.streakhistory.map((item: any) =>
            UTCToZoneTIme(item.date)
        );

        // const datesWithinCurrentWeek = parseAllStreakDates.filter((date) =>
        //     isWithinInterval(date, { start: currentWeekStart, end: currentWeekEnd })
        // );

        const currentWeekStreaks = parseAllStreakDates

        setStreakDays(currentWeekStreaks.flat().map(getDayOfTheWeek));
    }, [user, setStreakDays, setDynamicStreakArr]);

    useEffect(() => {
        if (bShow == true) {
            setIsModalVisible(true);
        }
    }, [bShow]);

    const hideModalHandler = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.streakCount}>
                    <View style={[styles.icon, styles.icon2]}>
                        <FontAwesome5
                            name="fire-alt"
                            size={moderateScale(15)}
                            color="white"
                        />
                    </View>
                    <Text style={styles.streakCountText}>{user.streak}</Text>
                </View>
                <View style={styles.icon}>
                    <FontAwesome5
                        name="fire-alt"
                        size={moderateScale(100)}
                        color="white"
                    />
                </View>
                <View>
                    <View style={styles.streakBox}>
                        {dynamicStreakArr.map((day) => (
                            <View style={styles.streakChild} key={day.id}>
                                <Text
                                    style={format(new Date(), "EEEE") === day.id ? styles.currentStreak : {}}
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
                                    {streakDays.includes(day.id) ? (
                                        <FontAwesome5
                                            name="check"
                                            size={moderateScale(21)}
                                            color="white"
                                        />
                                    ) : (
                                        <FontAwesome5
                                            name="times"
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
                </View>

                <View style={styles.btn}>

                    <PTFEButton
                        text="CONTINUE"
                        type="rounded"
                        color="#FF675B"
                        onClick={goToScorePage}
                    />
                </View>
            </View>
        </View>
    );
}
