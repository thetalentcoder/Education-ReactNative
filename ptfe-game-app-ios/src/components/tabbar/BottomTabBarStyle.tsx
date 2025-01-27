import { StyleSheet, Dimensions } from "react-native";
import { Platform } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        height: moderateScale(98),
        backgroundColor: "white",
    },
    innercontainer: {
        flexDirection: "row",

        backgroundColor: "white",

        borderTopLeftRadius: moderateScale(28),
        borderTopRightRadius: moderateScale(28),
        borderColor: "transparent",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,

        elevation: 20,
        position:'relative',
    },
    normalEffect: {
        justifyContent: "center",
        alignItems: "center",
        
        width: moderateScale(66),
        height: moderateScale(66),
    },
    pressedEffect: {
        justifyContent: "center",
        alignItems: "center",

        width: moderateScale(66),
        height: moderateScale(66),
        borderRadius: moderateScale(8),
        backgroundColor: "#FBF5FF",
    }
});