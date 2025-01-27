import React, { useCallback, useEffect, useState } from "react";
import { Alert } from 'react-native';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { moderateScale } from "src/config/scale";

import { saveLoginInfo } from "src/storage/Storage";
import { PTFELoading } from "src/components/loading";

import SectionLogin from "src/sections/Auth/SectionLogin";
import styles from "./LoginStyle";

import {
  appleloginuser,
  emailVerification,
  forgotPassword,
  login,
  logout,
} from "src/actions/auth/auth";
import { getMe } from "src/actions/user/user";

import { useDispatch } from "react-redux";
import { setUser } from "src/redux/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import CustomKeyboardAvoidingView from "src/wrappers/CustomKeyboardAvoidingView";
import { appleLogin } from "src/actions/slider/slider";

export default function Login() {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, SetRememberMe] = useState(false);
  const [email, SetEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");

  useEffect(() => {
    getLoginCredentialFromStorage();
  }, []);

  const getLoginCredentialFromStorage = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("savedEmail");
      const savedPassword = await AsyncStorage.getItem("savedPassword");
      
      if (savedEmail && savedPassword) {
        SetEmail(savedEmail);
        SetPassword(savedPassword);
        // handleLoginReCall();
      } else {
        SetRememberMe(false);
      }
    } catch (error) {
      console.log("Error retrieving login credentials from storage", error);
    }
  };

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
  
    const processLogin = async (loginFunction: (username: string, password: string) => Promise<any>) => {
      try {
        const user = await loginFunction(email, password);
        if (user?.token) {
          try {
            
            const userInfo = await getMe();
            
            dispatch(setUser(userInfo)); // Set the user info in Redux
            const notification = true;
            try {
              await AsyncStorage.setItem("savedEmail", email);
              await AsyncStorage.setItem("savedPassword", password);
              await AsyncStorage.setItem(
                "notificationPreference",
                JSON.stringify(notification)
              );
            } catch (storageError) {
              console.error("Failed to save data to AsyncStorage:", storageError);
            }

            navigation.navigate("Main");
            return true;
          } catch (getMeError) {
            console.error("Failed to fetch user info:", getMeError);
          }
        }
      } catch (error: any) {
        console.log(`Error during login: ${error.message}`);
      }
      return false;
    };
  
    try {
      const isWordPressLoginSuccessful = await processLogin(appleLogin);
      if (!isWordPressLoginSuccessful) {
        const isAppleLoginSuccessful = await processLogin(login);
        if (!isAppleLoginSuccessful) {
          await logout();
          loginErrorHandler(new Error("Both WordPress and Apple logins failed"));
        }
      }
    } catch (error) {
      console.log("this is test");
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);
  


  const loginErrorHandler = (error: any) => {
    if (
      error.message === "auth/invalid-email" || 
      error.message === "auth/invalid-credential" || 
      error.message === "[jwt_auth] invalid_email" || "[jwt_auth] invalid_username"
    ) {
      Alert.alert(
        "Login Error",
        `Invalid email or password.\nPlease choose a different email.`,
        [{ text: "OK" }]
      );
    } else if (error.message === "auth/too-many-requests") {
      Alert.alert(
        "Login Error",
        `Too many unsuccessful login attempts.\nPlease try again later.`,
        [{ text: "OK" }]
      );
    } else if (error.message === "[jwt_auth] incorrect_password") {
      Alert.alert(
        "Login Error",
        `Incorrect password. Please try again.`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Login Error",
        `Sign-in error: ${error.message}`,
        [{ text: "OK" }]
      );
    }
  };
  
  

  const handleRegister = useCallback(() => {
    navigation.navigate("Register");
  }, []);

  const handleForgetPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const goBack = useCallback(() => {
    navigation.navigate("Welcome");
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardcontainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={["#FF675B", "#87C6E8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.upperGradientContainer}
        />
        <TouchableOpacity style={styles.backContainer} onPress={goBack}>
          <View style={styles.back}>
            <Entypo
              name="chevron-left"
              size={moderateScale(20)}
              color="#FF675B"
            />
          </View>
        </TouchableOpacity>
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        <View style={styles.backgroundCircle3} />
        <View style={styles.backgroundSquare} />
        <View style={styles.sectionStartImage}>
          <Image
            style={styles.loginPanda}
            source={require("assets/images/imgs/npte-ninja-logo.png")}
          />
        </View>
        <View style={styles.sectionLogin}>
          <SectionLogin
            onLogin={handleLogin}
            onRegister={handleRegister}
            onForgetPassword={handleForgetPassword}
            rememberMe={rememberMe}
            setRememberMe={SetRememberMe}
            email={email}
            password={password}
            setEmail={SetEmail}
            setPassword={SetPassword}
          />
        </View>
        {isLoading && <PTFELoading />}
      </View>
    </KeyboardAvoidingView>
  );
}
