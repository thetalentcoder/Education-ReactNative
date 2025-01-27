import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { FontAwesome6 } from '@expo/vector-icons';

import { PTFELinkButton } from "src/components/button";
import { login, logout } from "src/actions/auth/auth";

import globalStyle from "src/theme/globalStyle";
import styles from "./SectionEmailVerifyStyle";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    onBackToLogin: () => void;
    onGotoDashboard: () => void;
    email: string,
    password: string,
}

export default function SectionEmailVerify({
    onBackToLogin,
    onGotoDashboard,
    email,
    password,
}: Props) {
    const dispatch = useDispatch();

    const [emailVerified, setEmailVerified] = useState(false);
    const [remainTime, setRemainTime] = useState(3);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (!emailVerified) {
                await CheckEmailVerified();
            }
        }, 10000);
    
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (emailVerified) {
                if (remainTime > 1)
                    setRemainTime(remainTime - 1);
                else {
                    onGotoDashboard();
                }
            }
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [remainTime, emailVerified]);

    const CheckEmailVerified = useCallback(async () => {
        const user = await login(email, password);
        if (user.emailVerified) {
            setEmailVerified(true);
        }
        else {
            logout();
        }
    }, [email, password, dispatch, setEmailVerified]);

    return(
        <View style={styles.container}>
            <View style={styles.topImageContainer}>
                {
                    emailVerified ?
                    <>
                        <View style={globalStyle.margin32}/>
                        <Text style={styles.textRemainTime}>
                            {remainTime}
                        </Text>
                    </>
                    :
                    <>
                        <View style={globalStyle.margin32}/>
                        <ActivityIndicator size={50} color="#3498db" />
                    </>
                }

            </View>
            <View style={styles.buttonContainer}>
                {
                    emailVerified ? 
                    <>
                        <Text style={styles.text}>
                            <FontAwesome6 name="envelope-circle-check" size={24} color="#777777" />
                            {` Email Verified.`}
                        </Text>
                        <View style={globalStyle.margin16}/>
                    </>
                    : 
                    <>
                        <Text style={styles.text}>
                            {`Please wait while your email \nis being verified.`}
                        </Text>
                        <View style={globalStyle.margin16}/>
                        <PTFELinkButton
                            text="Back to login"
                            color="#FF675B"
                            underlined={false}
                            onClick={onBackToLogin}
                        />
                    </>
                }
                <View style={globalStyle.margin16}/>
            </View>
        </View>
    );
}