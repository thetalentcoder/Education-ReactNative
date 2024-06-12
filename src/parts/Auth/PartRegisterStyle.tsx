import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: verticalScale(58),
    },
    title: {
        fontFamily: "circular-std-black",
        fontSize: moderateScale(27),
        color: "#565656",

        marginBottom: verticalScale(28),
    },
    subtitle: {
        fontFamily: "circular-std-black",
        fontSize: moderateScale(16),
        color: "#999999",
        marginBottom: verticalScale(8),
    },
    rememberSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});