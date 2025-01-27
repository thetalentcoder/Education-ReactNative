import React, { useCallback } from "react";
import { View, Text, Linking, KeyboardAvoidingView } from "react-native";

import { PTFEButton, PTFELinkButton } from "src/components/button";
import PartLogin from "src/parts/Auth/PartLogin";
import styles from "./SectionLoginStyle";
import { useNavigation } from "@react-navigation/native";

type Props = {
    onLogin: () => void;
    onForgetPassword: () => void;
    onRegister:() => void;
    rememberMe: boolean;
    setRememberMe: (newValue: boolean) => void;
    email: string;
    password: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function SectionLogin({
    onLogin,
    onForgetPassword,
    onRegister,
    rememberMe,
    setRememberMe,
    email,
    password,
    setEmail,
    setPassword,
}: Props) {

    const openLink = () => {
        Linking.openURL('https://ninja.ptfinalexam.com/')
            .catch(err => console.error("Failed to open URL:", err));
    };
    const navigation: any = useNavigation();
    // const goRegister = useCallback(() => {
    //     navigation.navigate("Register");
    //   }, [navigation]);

    return(
        <View style={styles.container}>
            <View style={styles.loginFormContainer}>                
                <PartLogin 
                    onForgetPassword={onForgetPassword}
                    rememberMe={rememberMe}
                    setRememberMe={setRememberMe}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
            </View>

            <View style={styles.buttonContainer}>
                <PTFEButton
                    text="Log in"
                    type="rounded"
                    color="#FF675B"
                    onClick={onLogin}
                />
                <View style={styles.textContainer}>
                    <Text></Text>
                    <Text style={styles.text}>Not registered yet?   </Text>
                    <PTFELinkButton
                        text="Register here."
                        color="#FF675B"
                        underlined={false}
                        onClick={onRegister}
                    />
                    <Text></Text>
                </View>
            </View>
        </View>
    );
}