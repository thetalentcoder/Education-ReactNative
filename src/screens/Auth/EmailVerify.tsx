import React, { useCallback } from "react";
import { View } from "react-native";

import SectionEmailVerify from "src/sections/Auth/SectionEmailVerify";
import styles from "./EmailVerifyStyle";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    route?: any;
    navigation?: any;
}

export default function EmailVerify({
    route, 
    navigation,
}: Props) {
    const { email, password } = route.params;

    const handleGoToDashBoard = useCallback(() => {
        navigation.navigate("Main");
    }, []);

    const handleGoBackToLogin = useCallback(() => {
        navigation.navigate('Login');
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.upperGradientContainer}
            />
            <View style={styles.sectionEmailVerify}>
                <SectionEmailVerify
                    onBackToLogin={handleGoBackToLogin}
                    onGotoDashboard={handleGoToDashBoard}
                    email={email}
                    password={password}
                />
            </View>
        </View>
    );
}