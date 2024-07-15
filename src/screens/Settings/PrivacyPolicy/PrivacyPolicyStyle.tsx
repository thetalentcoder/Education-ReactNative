import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
        backgroundColor: "white",
    },
    innerContainer: {
        width: "100%",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 0.25,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    mainContent: {
        marginTop: verticalScale(80),
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF",
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: scale(8),
        padding: scale(32),
        paddingVertical: scale(48),
    },
    titleText: {
        color: "#666666",
        fontFamily: 'circular-std-black',
        fontSize: moderateScale(18),
        lineHeight: moderateScale(27),
    },
    modalText: {
        textAlign: "justify",
        width: "100%",
        color: "#666666",
        fontFamily: 'circular-std-regular',
        fontSize: moderateScale(16),
        lineHeight: moderateScale(24),
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        paddingTop: scale(32),
    },
});
