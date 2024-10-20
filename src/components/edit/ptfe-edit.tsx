import React, { useState } from "react";
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from "src/config/scale";
import NinjaEmailIcon from "assets/icons/NinjaEmailIcon";
import HideIcon from "assets/icons/HideIcon";
import ShowIcon from "assets/icons/ShowIcon";

const windowHeight = Dimensions.get("window").height;

type Props = {
    type: string;
    initValue?: string;
    onChangeText?: (newValue: string) => void;
    height?: number,
}

export default function PTFEEdit({
    type,
    initValue,
    onChangeText,
    height,
}: Props) {
    const [hidePassword, setHidePassword] = useState(true);

    switch(type) { 
        case 'text':
            return (
                <TextInput style={styles.text} 
                    value={initValue}
                    onChangeText={onChangeText}
                />
            )
            break;
        case 'email':
            return (
                <View style={styles.emailContainer}>
                    <TextInput 
                        style={styles.email}
                        value={initValue}
                        onChangeText={onChangeText}
                    />
                    <NinjaEmailIcon />
                </View>
            )
        case 'password':
            return (
                <View style={styles.passwordContainer}>
                    <TextInput 
                        style={styles.password}
                        secureTextEntry={hidePassword}
                        textContentType={"password"}
                        value={initValue}
                        onChangeText={onChangeText}
                    />
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setHidePassword(!hidePassword)}
                    >
                        {hidePassword ? <HideIcon /> : <ShowIcon />} 
                    </TouchableOpacity>
                </View>
            )
        case 'multiline': 
            return (
                <TextInput style={[styles.multiline, {height: height}]} 
                    value={initValue}
                    onChangeText={onChangeText}
                    multiline={true}
                />
            )
            break;
     }
}

const styles = StyleSheet.create({
    text: {
        width: "100%",
        height: verticalScale(64),

        borderColor: "#999999",
        borderWidth: moderateScale(1),
        borderRadius: scale(16),
        paddingVertical: moderateScale(8),
        paddingHorizontal: scale(20),

        fontFamily: 'poppins-regular',
        color: "#333333",
        fontSize: moderateScale(16),
    },
    multiline: {
        width: "100%",
        height: verticalScale(64),

        borderColor: "#999999",
        borderWidth: moderateScale(1),
        borderRadius: scale(16),
        paddingVertical: scale(20),
        paddingHorizontal: scale(20),

        fontFamily: 'poppins-regular',
        color: "#333333",
        fontSize: moderateScale(16),
        textAlignVertical: 'top'
    },
    passwordContainer: {
        width: "100%",
        height: verticalScale(64),

        flexDirection: 'row',
        alignItems: 'center',
        
        borderColor: "#999999",
        borderWidth: moderateScale(1),
        borderRadius: scale(16),
    },
    password: {
        flex: 1,
        paddingTop: 3,
        textAlignVertical: "center",
        paddingHorizontal: scale(16),

        fontFamily: 'poppins-regular',
        color: "#333333",
        fontSize: moderateScale(16),
        // letterSpacing: moderateScale(2),
    },
    emailContainer: {
        width: "100%",
        height: verticalScale(64),
        paddingRight: scale(8),
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#999999",
        borderWidth: moderateScale(1),
        borderRadius: scale(16),
    },
    email: {
        flex: 1,
        paddingTop: 3,
        textAlignVertical: "center",
        paddingHorizontal: scale(16),

        fontFamily: 'poppins-regular',
        color: "#333333",
        fontSize: moderateScale(16),
        // letterSpacing: moderateScale(2),
    },
    toggleButton: {
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(10),
    }
})
