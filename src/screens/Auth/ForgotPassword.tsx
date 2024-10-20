import React, { useCallback, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";

import { PTFELoading } from "src/components/loading";
import SectionForgotPassword from "src/sections/Auth/SectionForgotPassword";
import { Entypo } from "@expo/vector-icons";
import { moderateScale } from "src/config/scale";

import { logout, signup, resetPassReq } from "src/actions/auth/auth";
import styles from "./RegisterStyle";
import { LinearGradient } from "expo-linear-gradient";
import CustomKeyboardAvoidingView from "src/wrappers/CustomKeyboardAvoidingView";

export default function ForgotPassword() {
  const navigation: any = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, SetEmail] = useState<string>("");
  const [fullName, SetFullName] = useState<string>("Jin");
  const [password, SetPassword] = useState<string>("123546");
  const [passwordConfirm, SetPasswordConfirm] = useState<string>("123456");

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
        const response = await resetPassReq(email);
        if(response) {
          SetEmail("");
          Toast.show("You've just sent a request to reset the password", 1000)
          navigation.navigate("Login")
        } else {
          Toast.show("Your request was failed", 1000)
        }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [email, fullName, password, passwordConfirm]);

  const handleGoBack = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  return (
    <CustomKeyboardAvoidingView>
      <View style={styles.container}>
        <LinearGradient
          colors={["#FF675B", "#87C6E8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.upperGradientContainer}
        />
        <TouchableOpacity style={styles.backContainer} onPress={handleGoBack}>
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

        <View style={styles.sectionRegister}>
          <SectionForgotPassword
            setEmail={SetEmail}
            // setFullName={SetFullName}
            // setPassword={SetPassword}
            // setConfirmPassword={SetPasswordConfirm}
            onSubmit={onSubmit}
            onGoBack={handleGoBack}
          />
        </View>
        {isLoading && <PTFELoading />}
      </View>
    </CustomKeyboardAvoidingView>
  );
}
