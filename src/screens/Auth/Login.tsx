import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-simple-toast';
import * as SecureStore  from "expo-secure-store";

import { saveLoginInfo } from "src/storage/Storage";
import { PTFELoading } from "src/components/loading";

import SectionLogin from "src/sections/Auth/SectionLogin";
import styles from "./LoginStyle";

import { emailVerification, forgotPassword, login, logout } from "src/actions/auth/auth";
import { getMe } from "src/actions/user/user";

import { useDispatch } from "react-redux";
import { setUser } from "src/redux/userSlice";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, SetRememberMe] = useState(false);
    const [email, SetEmail] = useState<string>('');
    const [password, SetPassword] = useState<string>('');

    useEffect(() => {
        getLoginCredentialFromStorage();
    }, []);

    const getLoginCredentialFromStorage = async() => {
        const savedEmail:any = await SecureStore.getItemAsync('savedEmail');
        const savedPassword:any = await SecureStore.getItemAsync('savedPassword');

        if (savedEmail != undefined)
            SetRememberMe(true);

        SetEmail(savedEmail);
        SetPassword(savedPassword);
    }

    const handleLogin = useCallback(async () => {
        setIsLoading(true);
        if (rememberMe) {
            saveLoginInfo(SecureStore, email, password);
        }
        try {
            console.log(email, password);
            const user = await login(email, password);
            if (user) {
                if (!user.emailVerified) {
                    await emailVerification();
                    await logout();
                    setIsLoading(false);

                    navigation.navigate('EmailVerify', {
                        email: email,
                        password: password,
                    } );
                }
                else {
                    const userInfo = await getMe();
                    dispatch(setUser(userInfo));

                    setIsLoading(false);
                    navigation.navigate("Main");
                }
            }
        } catch (error) {
            setIsLoading(false);
            loginErrorHandler(error);
        }
        
    }, [rememberMe, email, password]);


    const loginErrorHandler = (error: any) => {
        if (error.code === "auth/invalid-email" || error.code === "auth/invalid-credential") {
            Toast.show(`Invalid email or password.\nPlease choose a different email.`, 5000);
        } else if (error.code === "auth/too-many-requests") {
            Toast.show(`Too many unsuccessful login attempts.\nPlease try again later.`, 5000);
        } else {
            Toast.show(`Sign-in error: ${error.message}`, 5000);
        }
    }

    const handleRegister = useCallback(() => {
        navigation.navigate('Register');
    }, []);


    const handleForgetPassword = useCallback(async() => {
        if (email.length != 0) {
            await forgotPassword(email);
            Toast.show(`Password Reset Email sent.`, 5000);
        }
    }, [email]);
    
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.upperGradientContainer}
            />
            <View style={styles.backgroundCircle1} />
            <View style={styles.backgroundCircle2} />
            <View style={styles.backgroundCircle3} />
            <View style={styles.backgroundSquare} />
            <View style={styles.sectionLogin}>
                <SectionLogin 
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                    onForgetPassword={handleForgetPassword}
                    rememberMe={rememberMe}
                    setRememberMe={SetRememberMe}
                    email={email}
                    password={password}
                    setEmail={SetEmail}
                    setPassword={SetPassword}
                />
            </View>
            { isLoading && <PTFELoading /> }
        </View>
    );
}