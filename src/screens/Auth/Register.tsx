import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-simple-toast';

import { PTFELoading } from "src/components/loading";
import SectionRegister from "src/sections/Auth/SectionRegister";

import { logout, signup, userRegister } from "src/actions/auth/auth";
import styles from "./RegisterStyle";

export default function Register() {    
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
        <View style={styles.container}>
            <View style={styles.sectionRegister}>
                <SectionRegister 
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
    );
}