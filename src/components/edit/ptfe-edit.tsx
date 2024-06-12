import React, { useState } from "react";
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

type Props = {
    type: string;
    initValue?: string;
    onChangeText: (newValue: string) => void;
}

export default function PTFEEdit({
    type,
    initValue,
    onChangeText,
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
                        <Ionicons 
                            name={hidePassword ? 'eye-off' : 'eye'} 
                            size={verticalScale(26)} 
                            color="#333333" 
                        />
                    </TouchableOpacity>
                </View>
            )
            break;
     }
}

const styles = StyleSheet.create({
    text: {
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
    passwordContainer: {
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
    toggleButton: {
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(10),
    }
})
