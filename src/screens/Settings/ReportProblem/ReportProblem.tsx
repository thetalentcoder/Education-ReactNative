import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";

import styles from "./ReportProblemStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { useSelector } from "react-redux";
import { PTFEEdit } from "src/components/edit";

import globalStyle from "src/theme/globalStyle";

import ToggleSwitch from 'toggle-switch-react-native';
import { verticalScale } from "src/config/scale";


export default function ReportProblem() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state) => state.userData);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    

    const goBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onSignOut = useCallback(async () => {
        await logout();
        navigation.navigate("Login");
    }, [navigation]);

    const NavigateTo = useCallback((path: string) => {
        navigation.navigate(path);
    }, [navigation]);

    const sendEmail = useCallback((sTitle: string, sContent: string) => {
        const recipients = ['jin@perceptively.com', '']; // Array of recipient emails
        const subject = sTitle;
        const body = sContent;
      
        const to = recipients.join(',');
        const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
        Linking.openURL(mailtoUrl).catch((err) => console.error('Error opening email client', err));
    }, []);
      

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient>
            <ScrollView style={styles.innerContainer}>
                <View style={styles.headerContainer}>
                    <SectionHeader 
                        title="Report a Problem" 
                        goBack={goBack}
                    />
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.modalText}>Issue Title</Text>
                        <PTFEEdit 
                            type="text"
                            initValue={title}
                            onChangeText={setTitle}
                        />
                        <View style={globalStyle.margin2}></View>
                        <Text style={styles.modalText}>Description</Text>
                        <PTFEEdit 
                            type="multiline"
                            initValue={content}
                            onChangeText={setContent}
                            height={verticalScale(320)}
                        />
                        <View style={globalStyle.margin8}></View>
                        <PTFEButton
                            text="SEND"
                            type="rounded"
                            color="#FF675B"
                            onClick={() => { sendEmail(title, content) }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}