import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderTopLeftRadius: moderateScale(32),
        borderTopRightRadius: moderateScale(32),
        paddingLeft: moderateScale(32),
        paddingRight: moderateScale(32),

        backgroundColor: "white",
    },

    loginFormContainer: {
        flex: 50,
        width: "100%",
    },

    buttonContainer: {
        flex: 50,
        width: "100%",
        marginTop: verticalScale(16)
    },
    textContainer: {
        marginTop: verticalScale(16),
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    text: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(13),
        color: "#999999",
        textAlign: 'center',
        marginBottom: verticalScale(5)
    },
});