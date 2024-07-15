import React, { useCallback, useState } from "react";
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

export default function Profile() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state) => state.userData);

    const [modalVisible, setModalVisible] = useState(false);

    const [userName, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [current, setCurrentPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    
    const showModal = useCallback(() => {
        setModalVisible(true);
    }, [setModalVisible]);

    const hideModal = useCallback(() => {
        setModalVisible(false);
    }, [setModalVisible]);

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
                        fullname={user.fullname}
                        score={user.score}
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
                                            Linking.openURL('https://ptfinalexam.com/');
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