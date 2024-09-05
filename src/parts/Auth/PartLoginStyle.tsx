import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: verticalScale(72),
    },
    title: {
        fontFamily: "circular-std-black",
        fontSize: moderateScale(27),
        color: "#565656",

        marginBottom: verticalScale(28),
    },
    subtitle: {
        fontFamily: "circular-std-black",
        fontSize: moderateScale(18),
        color: "#999999",
        marginBottom: verticalScale(14),
    },
    rememberSection: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: verticalScale(26),
        marginRight: 6
    },
});