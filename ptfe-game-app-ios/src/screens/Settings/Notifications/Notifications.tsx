import React, { useCallback, useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";

import styles from "./NotificationStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { useSelector } from "react-redux";

import AsyncStorage from '@react-native-async-storage/async-storage';
import ToggleSwitch from 'toggle-switch-react-native';

export default function Notifications() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state: any) => state.userData);

    const [notification, setNotification] = useState(false);

    const goBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onSignOut = useCallback(async () => {
        await logout();
        navigation.navigate("Login");
    }, [navigation]);

    const NavigateTo = useCallback((path: string) => {
        navigation.navigate(path);
    }, [navigation]);

    // Load notification state from AsyncStorage
    useEffect(() => {
        const loadNotificationPreference = async () => {
            try {
                const savedPreference = await AsyncStorage.getItem("notificationPreference");
                if (savedPreference !== null) {
                    setNotification(JSON.parse(savedPreference));
                }
            } catch (error) {
                console.error("Error loading notification preference:", error);
            }
        };

        loadNotificationPreference();
    }, []);

    // Save notification state to AsyncStorage
    const toggleNotification = async (isOn: boolean | ((prevState: boolean) => boolean)) => {
        try {
            setNotification(isOn);
            await AsyncStorage.setItem("notificationPreference", JSON.stringify(isOn));
        } catch (error) {
            console.error("Error saving notification preference:", error);
        }
    };

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
                    <SectionHeader 
                        title="Notifications" 
                        goBack={goBack}
                    />
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.mainContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.modalText}>Notifications</Text>
                        </View>
                        <View style={styles.toggleContainer}>
                            <ToggleSwitch
                                isOn={notification}
                                onColor="#FF675B"
                                offColor="grey"
                                label=""
                                labelStyle={{ color: "black", fontWeight: "900" }}
                                size="medium"
                                onToggle={toggleNotification}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
