import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    title: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(16),
        color: "#2C2C2C",
    },
});