import React, { useCallback } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";
import SectionProfileContent from "src/sections/Profile/SectionProfileContent";

import styles from "./ProfileStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { scale } from "src/config/scale";
import { useSelector } from "react-redux";

export default function Profile() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state) => state.userData);
    
    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home");
    }, [navigation]);

    const onSignOut = useCallback(async () => {
        await logout();
        navigation.navigate("Login");
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
                    <SectionHeader title="Profile" goBack={gotoDashboard}/>
                </View>
                <View style={styles.mainContent}>
                    <SectionProfileContent 
                        fullname={user.fullname}
                        score={user.score}
                    />
                </View>
                <View style={{paddingHorizontal: scale(40), paddingBottom: scale(16), backgroundColor: "white"}}>
                    <PTFEButton
                        text="Sign Out"
                        type="rounded"
                        color="#FF675B"
                        onClick={onSignOut}
                    />
                </View>
            </ScrollView>
        </View>
    )
}