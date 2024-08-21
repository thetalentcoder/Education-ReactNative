import React, { useCallback } from "react";
import { View, ScrollView, Text, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PTFEButton } from "src/components/button";
import { logout } from "src/actions/auth/auth";

import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import styles from "./SettingScreenStyle";
import { scale } from "src/config/scale";

type props = {
    route?: any;
    navigation?: any;
}

export default function SettingScreen({
    route,
    navigation
}: props ) {
    const NavigateTo = useCallback((path: string) => {
        navigation.navigate(path);
    }, [navigation]);

    const onSignOut = useCallback(async () => {
        await logout();
        navigation.navigate("Login");
    }, [navigation]);

    const buttonHeight = scale(54);

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
                    <SectionHeaderX
                        title={"Settings"}
                        goBack={() => {NavigateTo("ProfileScr")}}
                    />
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.mainContainer}>
                        <View style={styles.inputFields}>
                            <PTFEButton
                                text="Account Settings"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    NavigateTo("AccountSettings");
                                }}
                                height={buttonHeight}
                            />
                            <PTFEButton 
                                text="Billing"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    Linking.openURL('https://ptfinalexam.com/');
                                }}
                                height={buttonHeight}
                            />
                            <PTFEButton
                                text="Notifications"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    NavigateTo("Notifications");
                                }}
                                height={buttonHeight}
                            />
                            <PTFEButton
                                text="Report a Problem"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    NavigateTo("ReportProblem");
                                }}
                                height={buttonHeight}
                            />
                            <PTFEButton
                                text="Rewatch the Tutorial"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    NavigateTo("WatchTutorial");
                                }}
                                height={buttonHeight}
                            />
                            <PTFEButton
                                text="Terms & Privacy Policy"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    NavigateTo("PrivacyPolicy");
                                }}
                                height={buttonHeight}
                            />
                            <PTFEButton
                                text="Shop More Proudcts"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    Linking.openURL('https://ptfinalexam.com/');
                                }}
                                height={buttonHeight}
                            />
                            <PTFEButton
                                text="Log Out"
                                type="rounded"
                                color="#FF675B"
                                onClick={() => {
                                    onSignOut();
                                }}
                                height={buttonHeight}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}