import React, { useCallback, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";

import styles from "./PrivacyPolicyStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { useSelector } from "react-redux";
import { PTFEEdit } from "src/components/edit";

import globalStyle from "src/theme/globalStyle";

import ToggleSwitch from 'toggle-switch-react-native';
import { verticalScale } from "src/config/scale";

import Mailer from 'react-native-email';
import useSendEmail from "src/hooks/useSendMail";


export default function PrivacyPolicy() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state) => state.userData);

    const [title, setTitle] = useState('');
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
        sendMail({
            subject: title,
            description: `<b>Hi</b>, ${content}`,
            isHTML: true,
            attachments: {}
        }); 
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
                        title="Terms & Privacy Policy" 
                        goBack={goBack}
                    />
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.titleText}>
{`Terms & Privacy Policy\n`}
                        </Text>
                        <Text style={styles.modalText}>
{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Mauris vitae ultricies metus. Nam non ornare erat. Phasellus id nunc at mauris fringilla pretium. Integer sit amet venenatis urna. Morbi euismod, purus nec aliquet varius, nulla eros tristique nisi, ut dignissim arcu nulla at quam. Etiam at leo ultricies, faucibus ligula a, luctus elit. Nulla facilisi. Quisque et nunc turpis. Fusce consequat venenatis arcu, vel pharetra sapien.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum, arcu sit
`}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <PTFEButton
                                text="Go Back"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    navigation.goBack();
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}