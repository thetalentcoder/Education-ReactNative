import React, { useCallback, useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Text, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from 'expo-linking';

import SectionHeader from "src/sections/Common/SectionHeader";
import SectionProfileContent from "src/sections/Profile/SectionProfileContent";

import styles from "./ProfileStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { scale } from "src/config/scale";
import { useSelector } from "react-redux";
import SectionHeaderSetting from "src/sections/Common/SectionHeaderSetting";
import { PTFEEdit } from "src/components/edit";
import { useDispatch } from 'react-redux';
import { getMe, getRankingSeason } from 'src/actions/user/user';
import { setUser } from 'src/redux/userSlice';

export default function Profile() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state: any) => state.userData);
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const [currentSeasonPoints, setCurrentSeasonPoints] = useState<any>(0);
    const [currentSeasonRank, setCurrentSeasonRank] = useState<any>(0);

    const [userName, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [current, setCurrentPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    useEffect(() => {
        refreshUserData();
    }, []);
    
    const refreshUserData = useCallback(async () => {
        const userInfo = await getMe();
        dispatch(setUser(userInfo));
    }, [dispatch]);

    const showModal = useCallback(() => {
        navigation.navigate("SettingScreen");
    }, [navigation]);

    const hideModal = useCallback(() => {
        setModalVisible(false);
    }, [setModalVisible]);

    useEffect(() => {
        calculateSeasonInfo(user?.score_total_months);
    }, [user]);

    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    const onSignOut = useCallback(async () => {
        await logout();
        navigation.navigate("Login");
    }, [navigation]);

    const NavigateTo = useCallback((path: string) => {
        navigation.navigate(path);
    }, [navigation]);
    console.log("###USERDATA", user)

    const fetchRank = async (season: number | undefined, username: string) => {
        let resultWithUserRank = 0; // Declare with let to allow reassignment
        try {
            // setIsLoading(true);
            const result = await getRankingSeason(season);
            
            // Use forEach instead of map for side effects
            result?.seasonScores.forEach((userlist: any, index: number) => {
                if (userlist.userName === username) {
                    resultWithUserRank = index + 1; // Update rank if user found
                }
            });
    
            setCurrentSeasonRank(resultWithUserRank); // Update the state with the user's rank
    
        } catch (error) {
            console.log(error);
        } finally {
            // setIsLoading(false); // Uncomment this if you manage loading state
            console.log("finally");
        }
    }
    

    function calculateSeasonInfo(scoreTotalMonths: number[]) {
        const seasons: number[] = [
            scoreTotalMonths.slice(0, 3).reduce((a, b) => a + b, 0),
            scoreTotalMonths.slice(3, 6).reduce((a, b) => a + b, 0),
            scoreTotalMonths.slice(6, 9).reduce((a, b) => a + b, 0),
            scoreTotalMonths.slice(9, 12).reduce((a, b) => a + b, 0)
        ];
    
        const currentMonth: number = new Date().getMonth();
        const currentSeason: number = Math.floor(currentMonth / 3);
    
        const sortedSeasons: number[] = [...seasons].sort((a, b) => b - a);
        const ranks: number[] = seasons.map(season => sortedSeasons.indexOf(season) + 1);
    
        const currentSeasonPoints: number = seasons[currentSeason];
        // const currentSeasonRank: number = ranks[currentSeason];
    
        setCurrentSeasonPoints(currentSeasonPoints); 
        // setCurrentSeasonRank(currentSeasonRank);
        if (user) {
            const username = user?.fullname; // Get the username
            fetchRank(currentSeason, username); // Fetch the rank for the user
        }
    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient>
            <ScrollView style={styles.innerContainer}>
                <View style={styles.headerContainer}>
                    <SectionHeaderSetting 
                        title="Profile" 
                        goBack={gotoDashboard}
                        showModal={showModal}
                        />
                </View>
                <View style={styles.mainContent}>
                    <SectionProfileContent 
                        fullname={user?.fullname}
                        score={user?.score}
                        currentSeasonPoints={currentSeasonPoints}
                        currentSeasonRank={currentSeasonRank}
                    />
                </View>
            </ScrollView>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.mainContainer}>
                                <View style={styles.inputFields}>
                                    <PTFEButton
                                        text="Go Back"
                                        type="circle"
                                        color="#87C6E8"
                                        onClick={() => {
                                            hideModal();
                                        }}
                                    />
                                    <PTFEButton
                                        text="Account Settings"
                                        type="circle"
                                        color="#87C6E8"
                                        onClick={() => {
                                            hideModal();
                                            NavigateTo("AccountSettings");
                                        }}
                                    />
                                    <PTFEButton
                                        text="Billing"
                                        type="circle"
                                        color="#87C6E8"
                                        onClick={() => {
                                            hideModal();
                                            Linking.openURL('https://ninja.ptfinalexam.com/my-account/');
                                        }}
                                    />
                                    <PTFEButton
                                        text="Notifications"
                                        type="circle"
                                        color="#87C6E8"
                                        onClick={() => {
                                            hideModal();
                                            NavigateTo("Notifications");
                                        }}
                                    />
                                    <PTFEButton
                                        text="Report a Problem"
                                        type="circle"
                                        color="#87C6E8"
                                        onClick={() => {
                                            hideModal();
                                            NavigateTo("ReportProblem");
                                        }}
                                    />
                                    <PTFEButton
                                        text="Rewatch the Tutorial"
                                        type="circle"
                                        color="#87C6E8"
                                        onClick={() => {
                                            hideModal();
                                            NavigateTo("WatchTutorial");
                                        }}
                                    />
                                    <PTFEButton
                                        text="Terms & Privacy Policy"
                                        type="circle"
                                        color="#87C6E8"
                                        onClick={() => {
                                            hideModal();
                                            NavigateTo("PrivacyPolicy");
                                        }}
                                    />
                                    <PTFEButton
                                        text="Log Out"
                                        type="circle"
                                        color="#FF675B"
                                        onClick={() => {
                                            hideModal();
                                            onSignOut();
                                        }}
                                    />
                                </View>
                            {/* </View> */}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}