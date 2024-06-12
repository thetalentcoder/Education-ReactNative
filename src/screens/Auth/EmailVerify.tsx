import React, { useCallback } from "react";
import { View } from "react-native";

import SectionEmailVerify from "src/sections/Auth/SectionEmailVerify";
import styles from "./EmailVerifyStyle";

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