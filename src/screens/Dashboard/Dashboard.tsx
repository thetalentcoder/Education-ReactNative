import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, BackHandler, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { logout } from "src/actions/auth/auth";

import SectionUserInfo from "src/sections/Dashboard/SectionUserInfo";
import SectionSlider from "src/sections/Dashboard/SectionSlider";
import SectionGameMode from "src/sections/Dashboard/SectionGameMode";
import SectionQuiz from "src/sections/Dashboard/SectionQuiz";

import { UseSelector, useDispatch, useSelector } from "react-redux";

import styles from "./DashboardStyle";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";

export default function Dashboard() {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userData.user);
    
    const scrollRef = useRef(0);
    const [refreshQuiz, setRefreshQuizList] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => true
        );

        return () => backHandler.remove();
    }, []);

    const refreshData = useCallback(async() => {
        setRefreshQuizList(!refreshQuiz);
        const userInfo = await getMe();
        dispatch(setUser(userInfo[0]));
    }, [refreshQuiz, setRefreshQuizList]);

    return (
        <View style={styles.container}>
            <ScrollView
            >
                <View style={styles.backgroundCircle1} />
                <View style={styles.backgroundCircle2} />

                <View style={styles.sectionUserInfo}>
                    <SectionUserInfo 
                        streaks={user?.streak}
                        score={user?.score}
                    />
                </View>
                <View style={styles.sectionSlider}>
                    <SectionSlider />
                </View>

                <View style={styles.scrollViewArea}>
                        <View style={styles.sectionGameMode}>
                            <SectionGameMode />
                        </View>
                        <View style={styles.sectionQuiz}>
                            <SectionQuiz 
                                refresh={refreshQuiz}
                            />
                        </View>
                </View>
            </ScrollView>
        </View>
    );
}