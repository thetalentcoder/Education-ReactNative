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

      console.log("this is first values", email, password);

      if (savedEmail && savedPassword) {
        SetEmail(savedEmail);
        SetPassword(savedPassword);
        handleLoginReCall();
      } else {
        SetRememberMe(false);
      }
    } catch (error) {
      console.log("Error retrieving login credentials from storage", error);
    }
  };

  // const handleLogin = useCallback(async () => {
  //   setIsLoading(true);

  //   try {
  //     console.log(email, password);
  //     const user = await login(email, password);

  //     if (user) {
  //       if (!user.emailVerified) {
  //         await emailVerification();
  //         await logout();
  //         setIsLoading(false);
  //         navigation.navigate("EmailVerify", { email, password });
  //       } else {
  //         const userInfo = await getMe();
  //         dispatch(setUser(userInfo)); // Set the user info in Redux

  //         await AsyncStorage.setItem("savedEmail", email);
  //         await AsyncStorage.setItem("savedPassword", password);

  //         setIsLoading(false);
  //         navigation.navigate("Main");
  //       }
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     loginErrorHandler(error);
  //   }
  // }, [rememberMe, email, password]);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);

    try {
      console.log(email, password);
      const user = await login(email, password);

      if (user) {
        if (!user.token) {
          await logout();
          setIsLoading(false);
        } else {
          const userInfo = await getMe();
          console.log("##userInfo", userInfo.fullname)
          dispatch(setUser(userInfo)); // Set the user info in Redux

          await AsyncStorage.setItem("savedEmail", email);
          await AsyncStorage.setItem("savedPassword", password);

          setIsLoading(false);
          navigation.navigate("Main");
        }
      }
    } catch (error) {
      setIsLoading(false);
      loginErrorHandler(error);
    }
  }, [rememberMe, email, password]);

  const handleLoginReCall = useCallback(async () => {
    setIsLoading(true);
    try {
      const recallEmail = await AsyncStorage.getItem("savedEmail");
      const reCallPassword = await AsyncStorage.getItem("savedPassword");
      const user = await login(recallEmail, reCallPassword);
      if (user) {
        if (!user.token) {
          await logout();
          setIsLoading(false);
          navigation.navigate("EmailVerify", { email, password });
        } else {
          const userInfo = await getMe();
          dispatch(setUser(userInfo)); // Set the user info in Redux

          setIsLoading(false);
          navigation.navigate("Main");
        }
      }
    } catch (error) {
      setIsLoading(false);
      loginErrorHandler(error);
    }
  }, [rememberMe, email, password]);

  // const loginErrorHandler = (error: any) => {
  //   if (
  //     error.code === "auth/invalid-email" ||
  //     error.code === "auth/invalid-credential"
  //   ) {
  //     Toast.show(
  //       `Invalid email or password.\nPlease choose a different email.`,
  //       15000
  //     );
  //   } else if (error.code === "auth/too-many-requests") {
  //     Toast.show(
  //       `Too many unsuccessful login attempts.\nPlease try again later.`,
  //       15000
  //     );
  //   } else {
  //     // Toast.show(`Sign-in errormessage: ${error.message}`, 35000);
  //     // Toast.show(`Sign-in errorcode: ${error.message.code}`, 35000);
  //     // Toast.show(`Sign-in error: ${error}`, 35000);
  //     Alert.alert(
  //       "Login Error", 
  //       `Sign-in error: ${error}`,
  //       [{ text: "OK" }]
  //     );
  //   }
  // };
  const loginErrorHandler = (error: any) => {
    // Handle specific error codes
    if (
      error.message === "auth/invalid-email" || 
      error.message === "auth/invalid-credential" || 
      error.message === "[jwt_auth] invalid_email"
    ) {
      Toast.show(
        `Invalid email or password.\nPlease choose a different email.`,
        15000
      );
      Alert.alert(
        "Login Error",
        `Invalid email or password.\nPlease choose a different email.`,
        [{ text: "OK" }]
      );
    } else if (error.message === "auth/too-many-requests") {
      // Toast.show(
      //   `Too many unsuccessful login attempts.\nPlease try again later.`,
      //   15000
      // );
      Alert.alert(
        "Login Error",
        `Too many unsuccessful login attempts.\nPlease try again later.`,
        [{ text: "OK" }]
      );
    } else if (error.message === "[jwt_auth] incorrect_password") {
      // Toast.show(
      //   `Incorrect password. Please try again.`,
      //   15000
      // );
      Alert.alert(
        "Login Error",
        `Incorrect password. Please try again.`,
        [{ text: "OK" }]
      );
    } else {
      // Handle unknown errors
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
    <CustomKeyboardAvoidingView>
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
    </CustomKeyboardAvoidingView>
  );
}
