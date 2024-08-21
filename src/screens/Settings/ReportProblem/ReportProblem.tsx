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

import Mailer from 'react-native-email';
import useSendEmail from "src/hooks/useSendMail";


export default function ReportProblem() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state) => state.userData);

    const [title, setTitle] = useState('Problems with using NPTE Ninja');
    const [content, setContent] = useState('');

    const { sendMail } = useSendEmail();
    

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

    const handleEmail = useCallback(() => {
        // sendMail({
        //     subject: title,
        //     description: `${content}`,
        //     isHTML: true,
        //     attachments: [],
        //     userid: user._id,
        // }); 
        Linking.openURL('mailto:nick@perceptively.com; luka@perceptively.com; jin@perceptively.com'
             + `?subject=${title}&body=${content} \nAccount Id: ${user?._id}`);
    }, [title, content]);

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
                            onClick={() => {handleEmail()}}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}