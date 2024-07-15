import React, { useCallback, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";

import styles from "./NotificationStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { useSelector } from "react-redux";
import { PTFEEdit } from "src/components/edit";

import globalStyle from "src/theme/globalStyle";

import ToggleSwitch from 'toggle-switch-react-native';


export default function Notifications() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state) => state.userData);

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
                                onToggle={isOn => setNotification(!notification)}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.buttonContainer}>
                        <View style={styles.button1Wrap}>
                            <PTFEButton
                                text="Save"
                                type="rounded"
                                color="#FF675B"
                                onClick={() => {}}
                            />
                        </View>
                        <View style={styles.button2Wrap}>
                            <PTFEButton
                                text="Back"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {setModalVisible(false)}}
                            />
                        </View>
                    </View> */}
                </View>
            </ScrollView>
        </View>
    )
}