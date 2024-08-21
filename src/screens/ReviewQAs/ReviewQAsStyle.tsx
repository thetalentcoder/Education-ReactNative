import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

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
        height: windowHeight * 0.3,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    statusContainer: {
        marginTop: verticalScale(32),
        width: "100%",
    },
    mainContent: {
        width: "100%",
        marginTop: verticalScale(32),
        borderTopLeftRadius: moderateScale(32),
        borderTopRightRadius: moderateScale(32),
        backgroundColor: "#FFFFFF"
    },
    scrollTopButton: {
        zIndex: 100,
        position: 'absolute',
        bottom: moderateScale(20),
        right: moderateScale(20),

        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderRadius: moderateScale(8),
        backgroundColor: "#87C6E8",

        justifyContent: "center",
        alignItems: "center",
    },
});
