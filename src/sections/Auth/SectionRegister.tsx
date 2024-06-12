import React from "react";
import { View, Text } from "react-native";

import { PTFEButton, PTFELinkButton } from "src/components/button";
import PartRegister from "src/parts/Auth/PartRegister";
import styles from "./SectionRegisterStyle";

type Props = {
    setEmail:() => (newValue: string) => void;
    setFullName:() => (newValue: string) => void;
    setPassword:() => (newValue: string) => void;
    setConfirmPassword:() => (newValue: string) => void;
    onRegister:() => void;
    onGoBack:() => void;
}

export default function SectionRegister({
    setEmail,
    setFullName,
    setPassword,
    setConfirmPassword,
    onRegister,
    onGoBack,
}: Props) {
    return(
        <View style={styles.container}>
            <View style={styles.loginFormContainer}>
                <PartRegister 
                    setEmail={setEmail}
                    setFullName={setFullName}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                />
            </View>

            <View style={styles.buttonContainer}>
                <PTFEButton
                    text="REGISTER"
                    type="rounded"
                    color="#FF675B"
                    onClick={onRegister}
                />
                <View style={styles.textContainer}>
                    <Text></Text>
                    <Text style={styles.text}>Already have an account?</Text>
                    <PTFELinkButton
                        text="Back to login"
                        color="#FF675B"
                        underlined={false}
                        onClick={onGoBack}
                    />
                    <Text></Text>
                </View>
            </View>
        </View>
    );
}