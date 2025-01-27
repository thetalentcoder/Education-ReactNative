import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Image, View, Text, Linking, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./Billingstyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { useSelector } from "react-redux";
import { PTFEEdit } from "src/components/edit";
import globalStyle from "src/theme/globalStyle";
import ToggleSwitch from 'toggle-switch-react-native';
import { moderateScale, scale, verticalScale } from "src/config/scale";
import useSendEmail from "src/hooks/useSendMail";
import Purchases, { PurchasesStoreProduct, PURCHASES_ERROR_CODE } from "react-native-purchases";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { postUpdatePurchaseID } from "src/actions/billing/billing";

type Props = {
  route?: any;
  navigation?: any;
}

export default function Billing({ route, navigation }: Props) {
    const isFromRegister = route.params?.isFromRegister;
    const userid = route.params?.userid;
    console.log("&&&&&");
    console.log(userid);
    const { user } = useSelector((state: any) => state.userData);
    const features = [
        "7-day Free Trial to get you started",
        "Unlimited access to thousands of questions",
        "Many game modes & study tools",
        "Rank & compete against PT/PTA peers",
    ];
    const [selectedStudentType, setSelectedStudentType] = useState("PTA Student");
    const [selectedPlan, setSelectedPlan] = useState("1 Year");
    Purchases.setDebugLogsEnabled(true);
    const [products, setProducts] = useState<PurchasesStoreProduct[]>([]);
    const [purchaseId, setPurchaseId] = useState("");

    // Fetch Products from RevenueCat
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productIds = ["pt_monthly", "pt_annual", "pta_monthly", "pta_annual"];
          const fetchedProducts = await Purchases.getProducts(productIds);
          setProducts(fetchedProducts);
        } catch (e) {
          console.error("Error fetching products:", e);
        }
      };
  
      fetchProducts();
    }, []);
  
    // Determine the product ID based on selected options
    const getProductID = () => {
      if (selectedStudentType === "PT Student" && selectedPlan === "1 Year") {
        return "pt_annual";
      } else if (selectedStudentType === "PT Student" && selectedPlan === "1 Month") {
        return "pt_monthly";
      } else if (selectedStudentType === "PTA Student" && selectedPlan === "1 Year") {
        return "pta_annual";
      } else {
        return "pta_monthly";
      }
    };
  
    // Handle Purchase
    const handlePurchase = async () => {
        const productId = getProductID();
        const selectedProduct = products.find((pdt) => pdt.identifier === productId);
        
    
        if (!selectedProduct) {
          Alert.alert("Error", "Product not available");
          return;
        }
    
        try {
          const purchase = await Purchases.purchaseStoreProduct(selectedProduct);
    
          if (purchase.customerInfo.entitlements.active["entle250b645bb"]) {
            
            setPurchaseId(purchase.customerInfo.originalAppUserId)
            postPurchaseID();
            
            Alert.alert("Success", "You have successfully purchased the product!");
            // navigation.navigate("Home", { screen: "Dashboard" });
            navigation.navigate('Login');
          }
        } catch (e: any) {
            if (e.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
              Alert.alert("Cancelled", "Purchase was cancelled");
            } else if (e.code === PURCHASES_ERROR_CODE.NETWORK_ERROR) {
              Alert.alert("Network Error", "Please check your internet connection and try again.");
            } else if (e.code === PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR) {
              Alert.alert("Error", "Purchases are not allowed on this device.");
            } else {
              console.error("Error during purchase:", e);
              Alert.alert("Error", "Something went wrong. Please try again.");
            }
          }
      };
  
    // Handle Restore Purchases
    const handleRestorePurchases = async () => {
      try {
        const customerInfo = await Purchases.restorePurchases();
        if (Object.keys(customerInfo.entitlements.active).length > 0) {
          Alert.alert("Success", "Purchases restored successfully!");
        } else {
          Alert.alert("No Active Subscriptions", "No active subscriptions were found.");
        }
      } catch (e) {
        console.error("Restore Purchases Error:", e);
        Alert.alert("Error", "Failed to restore purchases. Please try again.");
      }
    };
    console.log("this is billing page", products);

    const goBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);
    // const onClick = useCallback(() => {
    //         navigation.navigate("Home", {
    //           screen: "Dashboard",
    //         });
    // }, [navigation]);
    const goSkip = useCallback(() => {
      navigation.navigate('Login');
      // navigation.navigate("Billing");
  }, []);

  const postPurchaseID = useCallback(async () => {
    const data = {
      userId: userid,
      purchaseId: purchaseId
    }
    try{
      const res = await postUpdatePurchaseID(data);
    } catch (e) {
      console.error("Save purchase Id to Database Error:", e);
      Alert.alert("Error", "Failed to save purchase id to database. Please try again.");
    }
  }, []);

    return (
    <KeyboardAvoidingView
      style={styles.keyboardcontainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView style={{width: "100%"}}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#FF675B", "#87C6E8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.upperGradientContainer}
        />
        {isFromRegister == false ?
        <TouchableOpacity style={styles.backContainer} onPress={goBack}>
          <View style={styles.back}>
            <Entypo
              name="chevron-left"
              size={moderateScale(20)}
              color="#FF675B"
            />
          </View>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.nextContainer} onPress={goSkip}>
          <View style={styles.back}>
            <Entypo
              name="chevron-right"
              size={moderateScale(20)}
              color="#FF675B"
            />
          </View>
        </TouchableOpacity>
        }
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
            <View style={styles.whiteContainer}>
                <Text style={styles.text_title}>Unlock Unlimited Acccess</Text>
                <View style={styles.featureContainer}>
                    <FlatList
                        data={features}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={scale(23)} color="#FF6B6B" />
                            <Text style={styles.featureText}>{item}</Text>
                        </View>
                        )}
                        style={styles.checklist}
                    />
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                selectedStudentType === "PT Student" && styles.activeButton,
                            ]}
                            onPress={() => setSelectedStudentType("PT Student")}
                        >
                            <View style={styles.plan1Container}>
                            <View style={[styles.radioCircle, selectedStudentType === "PT Student" && styles.activeRadio]}>
                            {selectedStudentType === "PT Student" && <View style={styles.radioSelected} />}
                            </View>
                            <Text
                                style={[
                                styles.toggleText,
                                selectedStudentType === "PT Student" && styles.activeText,
                                ]}
                            >
                                PT Student
                            </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                selectedStudentType === "PTA Student" && styles.activeButton,
                            ]}
                            onPress={() => setSelectedStudentType("PTA Student")}
                        >
                            <View style={styles.plan1Container}>
                            <View style={[styles.radioCircle, selectedStudentType === "PTA Student" && styles.activeRadio]}>
                            {selectedStudentType === "PTA Student" && <View style={styles.radioSelected} />}
                            </View>
                            <Text
                                style={[
                                styles.toggleText,
                                selectedStudentType === "PTA Student" && styles.activeText,
                                ]}
                            >
                                PTA Student
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={[
                    styles.planOption,
                    selectedPlan === "1 Month" && styles.activePlan,
                    ]}
                    onPress={() => setSelectedPlan("1 Month")}
                >
                    <View style={[styles.radioCircle, selectedPlan === "1 Month" && styles.activeRadio]}>
                    {selectedPlan === "1 Month" && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={[styles.planText, selectedPlan === "1 Month" && styles.activeText]}>1 Month: $7.99</Text>
                    <Text style={[styles.smallPlanText, selectedPlan === "1 Month" && styles.activeText]}>(Cancel anytime)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                    styles.planOption,
                    selectedPlan === "1 Year" && styles.activePlan,
                    ]}
                    onPress={() => setSelectedPlan("1 Year")}
                >
                    <View style={[styles.radioCircle, selectedPlan === "1 Year" && styles.activeRadio]}>
                    {selectedPlan === "1 Year" && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={[styles.planText, selectedPlan === "1 Year" && styles.activeText]}>1 Year: $79.99</Text>
                    <Text style={[styles.smallPlanText, selectedPlan === "1 Year" && styles.activeText]}>(Cancel anytime)</Text>
                </TouchableOpacity>
                
                <View style={styles.buttonContainer}>
                    <PTFEButton
                        text="Start 7-Day Free Trial"
                        type="rounded"
                        color="#FF675B"
                        onClick={handlePurchase}
                        // onClick={handleGoBack}
                    />
                </View>
                <View style={styles.bottomTextContainer}>
                <TouchableOpacity onPress={handleRestorePurchases}>
                    <Text style={styles.BottomText}>Restore purchases</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://your-terms-and-policy-url")}>
                    <Text style={styles.BottomText}>Terms & Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
}