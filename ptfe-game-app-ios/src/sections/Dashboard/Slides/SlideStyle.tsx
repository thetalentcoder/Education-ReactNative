import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        top: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(-40),
    },
    linearGradient: {
        paddingHorizontal: 24,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 16,
        height: verticalScale(220),
        width: "75%",
    },

    text_title: {
        fontFamily: 'circular-std-black',
        fontSize: verticalScale(22),
        lineHeight: verticalScale(32),

        textAlign: "left",
        color: "white",

        marginBottom: verticalScale(8),
    },
});