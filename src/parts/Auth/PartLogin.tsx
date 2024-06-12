import React from "react";
import { View, Text } from "react-native";

import { PTFECheckBox } from "src/components/button";
import { PTFELinkButton } from "src/components/button";
import { PTFEEdit } from "src/components/edit";

import globalStyle from "src/theme/globalStyle";
import styles from "./PartLoginStyle";

type Props = {
    onForgetPassword:() => void;
    rememberMe: boolean;
    setRememberMe: (newValue: boolean) => void;
    email: string;
    password: string;
    setEmail:() => (newValue: string) => void;
    setPassword:() => (newValue: string) => void;
}

export default function PartLogin({
    onForgetPassword,
    rememberMe,
    setRememberMe,
    email,
    password,
    setEmail,
    setPassword,
}: Props) {
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Login Now
                </Text>
                <Text style={styles.subtitle}>
                    Email Address
                </Text>
                <PTFEEdit 
                    type="text"
                    initValue={email}
                    onChangeText={setEmail}
                />

                <View style={{height: 23}}/>
                <Text style={styles.subtitle}>
                    Password
                </Text>
                <PTFEEdit 
                    type="password"
                    initValue={password}
                    onChangeText={setPassword}
                />
                
                <View style={styles.rememberSection}>
                    <PTFECheckBox
                        text="Remember me"
                        color="#FF675B"
                        checked={rememberMe}
                        setChecked={setRememberMe}
                    />
                    <PTFELinkButton
                        text="Forgot Password?"
                        color="#FF675B"
                        underlined={true}
                        onClick={onForgetPassword}
                    />
                </View>
            </View>
        </>
    );
}