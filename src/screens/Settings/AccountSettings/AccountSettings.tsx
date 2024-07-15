import React, { useCallback, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";

import styles from "./AccountSettingsStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { useSelector } from "react-redux";
import { PTFEEdit } from "src/components/edit";

import globalStyle from "src/theme/globalStyle";

export default function AccountSettings() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state) => state.userData);

    const [modalVisible, setModalVisible] = useState(false);

    const [userName, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [current, setCurrentPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    
    const showModal = useCallback(() => {
        setModalVisible(true);
    }, [setModalVisible]);

    const hideModal = useCallback(() => {
        setModalVisible(false);
    }, [setModalVisible]);

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
                        title="Account Settings" 
                        goBack={goBack}
                    />
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.mainContainer}>
                        <View style={styles.inputFields}>
                            {/* <View style={styles.avatarContainer}>
                            </View> */}
                            <Text>Username: </Text>
                            <PTFEEdit 
                                type="text"
                                initValue={userName}
                                onChangeText={setUserName}
                            />
                            <View style={globalStyle.margin4}></View>
                            <Text>New Password: </Text>
                            <PTFEEdit 
                                type="password"
                                initValue={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <Text>Confirm New Password: </Text>
                            <PTFEEdit 
                                type="password"
                                initValue={newPasswordConfirm}
                                onChangeText={setNewPasswordConfirm}
                            />
                            <View style={globalStyle.margin4}></View>
                            <PTFEButton
                                text="Save"
                                type="rounded"
                                color="#FF675B"
                                onClick={() => {}}
                            />
                            <PTFEButton
                                text="Back"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {goBack}}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.buttonContainer}>
                        <View style={styles.button1Wrap}>
                            <PTFEButton
                                text="Save"
                                type="rounded"
                                color="#FF675B"
                                onClick={() => {}}
                            />
                        </View>
                        <View style={styles.button2Wrap}>
                            <PTFEButton
                                text="Back"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {setModalVisible(false)}}
                            />
                        </View>
                    </View> */}
                </View>
            </ScrollView>
        </View>
    )
}