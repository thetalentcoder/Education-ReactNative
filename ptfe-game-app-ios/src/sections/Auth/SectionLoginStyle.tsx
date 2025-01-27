import { StyleSheet } from "react-native";
import { moderateScale, scale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderTopLeftRadius: moderateScale(28),
        borderTopRightRadius: moderateScale(28),
        paddingLeft: moderateScale(28),
        paddingRight: moderateScale(28),

        backgroundColor: "white",
    },

    loginFormContainer: {
        flex: 50,
        width: "100%",
    },

    buttonContainer: {
        flex: 15,
        width: "100%",
    },
    textContainer: {
        marginTop: moderateScale(16),
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(14),
        color: "#999999",
    },
});