import React from "react";
import { View, Text } from "react-native";

import { PTFEEdit } from "src/components/edit";

import globalStyle from "src/theme/globalStyle";
import styles from "./PartRegisterStyle";

type Props = {
    setEmail: () => (newValue: string) => void;
    setFullName: () => (newValue: string) => void;
    setPassword: () => (newValue: string) => void;
    setConfirmPassword: () => (newValue: string) => void;
}

export default function PartForgotPassword({
    setEmail,
    setFullName,
    setPassword,
    setConfirmPassword,
}: Props) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Recover Your Password
                </Text>
                <Text style={styles.subtitle}>
                    Email Address
                </Text>
                <PTFEEdit
                    type="text"
                    // initValue="Jin"
                    onChangeText={setFullName}
                />

                <View style={globalStyle.margin32} />
                <Text style={styles.subtitle}>
                    New Password
                </Text>
                <PTFEEdit
                    type="password"
                    // initValue="123456"
                    onChangeText={setPassword}
                />
                <View style={globalStyle.margin8} />
                <Text style={styles.subtitle}>
                    Confirm New Password
                </Text>
                <PTFEEdit
                    type="password"
                    // initValue="123456"
                    onChangeText={setConfirmPassword}
                />
            </View>
        </>
    );
}