import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: scale(24),
    },
    title: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(18),
        color: "#565656",
        marginBottom: verticalScale(8),
    }
});