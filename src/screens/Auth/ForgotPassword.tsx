import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-simple-toast';

import { PTFELoading } from "src/components/loading";
import SectionForgotPassword from "src/sections/Auth/SectionForgotPassword";

import { logout, signup, userRegister } from "src/actions/auth/auth";
import styles from "./RegisterStyle";
import { LinearGradient } from "expo-linear-gradient";
import CustomKeyboardAvoidingView from "src/wrappers/CustomKeyboardAvoidingView";

export default function ForgotPassword() {    
    const navigation:any = useNavigation();
    
    const [isLoading, setIsLoading] = useState(false);
    const [email, SetEmail] = useState<string>('jin@perceptively.com');
    const [fullName, SetFullName] = useState<string>('Jin');
    const [password, SetPassword] = useState<string>('123546');
    const [passwordConfirm, SetPasswordConfirm] = useState<string>('123456');

    
    const handleRegister = useCallback(async () => {
        setIsLoading(true);
        try {
            const user = await signup(email, password);
            if (user) {
                await userRegister(email, fullName);
                await logout();
                navigation.navigate("EmailVerify", {
                    email: email,
                    password: password,
                });
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.code === "auth/email-already-in-use") {
                Toast.show(`Email already in use.\nPlease choose a different email.`, 5000);
            } else if (error.code === "auth/weak-password") {
                Toast.show(`Weak password.\nPlease choose a stronger password.`, 5000);
            } else {
                Toast.show(`Signup error: ${error.message}`, 5000);
            }
        }
    }, [email, fullName, password, passwordConfirm]);


    const handleGoBack = useCallback(() => {
        navigation.navigate('Login');
    }, []);

    return (
        <CustomKeyboardAvoidingView>
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

                <View style={styles.sectionRegister}>
                    <SectionForgotPassword 
                        setEmail={SetEmail}
                        setFullName={SetFullName}
                        setPassword={SetPassword}
                        setConfirmPassword={SetPasswordConfirm}
                        onRegister={handleRegister}
                        onGoBack={handleGoBack}
                    />
                </View>
                { isLoading && <PTFELoading /> }
            </View>
        </CustomKeyboardAvoidingView>
    );
}