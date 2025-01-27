import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, Text, Linking, Alert, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PTFEButton } from "src/components/button";
import { logout } from "src/actions/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import styles from "./SettingScreenStyle";
import { scale } from "src/config/scale";
import apiService from "src/actions/middleware/apiService";
import { useSelector } from "react-redux";

type props = {
  route?: any;
  navigation?: any;
};

export default function SettingScreen({ route, navigation }: props) {
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<String>("web");
  const { user } = useSelector((state: any) => state.userData);

  useEffect(() => {
    const fetchToken = async () => {
      const tokenFrom = await AsyncStorage.getItem("token");
      
      if(user.userType) {
        setUserType(user.userType);
      };
      setToken(tokenFrom);
    };
    fetchToken();
  }, []);
  function redirectToManageSubscription() {
    const subscriptionURL =
        Platform.OS === "ios"
            ? "https://apps.apple.com/account/subscriptions"
            : "https://play.google.com/store/account/subscriptions";

    Linking.openURL(subscriptionURL).catch(() => {
        Alert.alert(
            "Error",
            "Unable to open subscription management page. Please try again later."
        );
    });
  }
  const goBilling = useCallback(() => {
    console.log("!!!!");
    console.log(user);
    navigation.navigate("Billing", {
      isFromRegister: false,
      userid: user._id
    });
  }, [navigation]);
  const handleSSOLogin = async (token: string | null) => {
    try {
        const response = await fetch('https://ninja.ptfinalexam.com/wp-json/custom/v1/sso-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        const data = await response.json();
        console.log("this is account setting page", data.redirect_url);
        if (response.ok) {
            // Use the redirect_url provided by the API
            Linking.openURL(data.redirect_url || 'https://ninja.ptfinalexam.com/my-account');
        } else {
            Alert.alert('SSO Login Failed', data.message || 'Please try again');
        }
    } catch (error) {
        Alert.alert('Network Error', 'Could not connect to the server');
    }
  };

  const NavigateTo = useCallback(
    (path: string) => {
      navigation.navigate(path);
    },
    [navigation]
  );
  const goback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSignOut = useCallback(async () => {
    try {
      await AsyncStorage.clear();
      await logout();
      console.log('All data cleared');
    } catch (error) {
      console.error('Failed to clear AsyncStorage data', error);
    }
    navigation.navigate("Login");
  }, [navigation]);

  const buttonHeight = scale(54);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF675B", "#87C6E8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        style={styles.upperGradientContainer}
      ></LinearGradient>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <SectionHeaderX
            title={"Settings"}
            goBack={() => {
              goback();
            }}
          />
        </View>
        <View style={styles.mainContent}>
          <View style={styles.mainContainer}>
            <View style={styles.inputFields}>
              <PTFEButton
                text="Account Settings"
                type="rounded"
                color="#87C6E8"
                onClick={() => {
                  NavigateTo("AccountSettings");
                }}
                height={buttonHeight}
              />
              {
                userType == "apple"? 
                <PTFEButton
                text="Billing"
                type="rounded"
                color="#87C6E8"
                // onClick={() => handleSSOLogin(token)}
                height={buttonHeight}
                //onClick={() => {redirectToManageSubscription();}}
                onClick={() => goBilling()}
                />: 
                <PTFEButton
                text="Billing"
                type="rounded"
                color="#87C6E8"
                // onClick={() => handleSSOLogin(token)}
                height={buttonHeight}
                onClick={() => {
                  handleSSOLogin(token);
                  }}
                />
              }
              <PTFEButton
                text="Notifications"
                type="rounded"
                color="#87C6E8"
                onClick={() => {
                  NavigateTo("Notifications");
                }}
                height={buttonHeight}
              />
              <PTFEButton
                text="Report a Problem"
                type="rounded"
                color="#87C6E8"
                onClick={() => {
                  NavigateTo("ReportProblem");
                }}
                height={buttonHeight}
              />
              <PTFEButton
                text="Rewatch the Tutorial"
                type="rounded"
                color="#87C6E8"
                onClick={() => {
                  NavigateTo("WatchTutorial");
                }}
                height={buttonHeight}
              />
              <PTFEButton
                text="Terms & Privacy Policy"
                type="rounded"
                color="#87C6E8"
                onClick={() => {
                  Linking.openURL(
                    "https://ptfinalexam.com/terms-and-conditions/"
                  );
                }}
                height={buttonHeight}
              />
              <PTFEButton
                text="Delete the accounts?"
                type="rounded"
                color="#87C6E8"
                onClick={() => {
                  NavigateTo("RemoveAccount");
                }}
                height={buttonHeight}
              />
              <PTFEButton
                text="Log Out"
                type="rounded"
                color="#FF675B"
                onClick={() => {
                  NavigateTo("Home");
                  onSignOut();
                }}
                height={buttonHeight}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
