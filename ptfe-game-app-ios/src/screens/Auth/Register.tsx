import React, { useCallback, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-simple-toast';

import { PTFELoading } from "src/components/loading";
import SectionRegister from "src/sections/Auth/SectionRegister";

import { logout, signup, userRegister } from "src/actions/auth/auth";
import styles from "./RegisterStyle";
import { LinearGradient } from "expo-linear-gradient";
import CustomKeyboardAvoidingView from "src/wrappers/CustomKeyboardAvoidingView";
import { appleregister } from "src/actions/slider/slider";

export default function Register() {    
    const navigation:any = useNavigation();
    
    const [isLoading, setIsLoading] = useState(false);
    const [email, SetEmail] = useState<string>('');
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [password, SetPassword] = useState<string>('');
    const [passwordConfirm, SetPasswordConfirm] = useState<string>('');
    
    const handleRegister = useCallback(async () => {
        
        if (!email || !password || !passwordConfirm) {
            Toast.show(`Please fill all fields.`, Toast.SHORT );
            return;
        }
        if (password !== passwordConfirm) {
            Toast.show(`Passwords do not match.`, Toast.SHORT );
            return;
        }
    
        setIsLoading(true);
        try {
            // const user = await signup(email, password);
            // if (user) {
            const user = await appleregister(email, firstName, lastName, password);
            
            console.log("-----");
            console.log(user);
            // Alert.alert(`Error", "success to login. 1${user.message}---------`);
            if(user != null) {
                // navigation.navigate("EmailVerify", { email, password });
                Toast.show(`Register Successfully!`, Toast.SHORT );
                navigation.navigate("Billing", {
                    isFromRegister: true,
                    userid: user.user._id
                })
            }
            // }
        } catch (error: any) {
            console.error("Signup error:", error);
            if (error.code === "auth/email-already-in-use") {
                Toast.show(`Email already in use.\nPlease choose a different email.`, Toast.SHORT );
            } else if (error.code === "auth/weak-password") {
                Toast.show(`Weak password.\nPlease choose a stronger password.`, Toast.SHORT );
            } else {
                Toast.show(`Signup error: ${error.message}`, Toast.SHORT );
            }
        } finally {
            setIsLoading(false);
        }
    }, [email, password, firstName, lastName]);
    


    const handleGoBack = useCallback(() => {
        navigation.navigate('Login');
        // navigation.navigate("Billing");
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.keyboardcontainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollViewContent} 
                showsVerticalScrollIndicator={false}
                >
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#FF675B', '#87C6E8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.upperGradientContainer}
                    />
                    <View style={styles.backgroundCircle1} />
                    <View style={styles.backgroundCircle2} />
                    <View style={styles.backgroundCircle3} />
                    <View style={styles.backgroundSquare} />

                    <View style={styles.sectionRegister}>
                        <SectionRegister 
                            setEmail={SetEmail}
                            setFirstName={setFirstName}
                            setLastName={setLastName}                            
                            email={email}
                            firstname={firstName}
                            lastname={lastName}
                            password={password}
                            passwordConfirm={passwordConfirm}
                            setPassword={SetPassword}
                            SetPasswordConfirm={SetPasswordConfirm}
                            onRegister={handleRegister}
                            onGoBack={handleGoBack}
                        />
                    </View>
                    { isLoading && <PTFELoading /> }
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}