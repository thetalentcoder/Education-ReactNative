import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "src/config/scale";

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
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 0.35,
        zIndex: 0,
    },
    innerContainer: {
        width: "100%",
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    mainContent: {
        position: "relative",
        width: "100%",
        marginTop: verticalScale(80),
    },
    mainContainer: {
        position: "relative",
        justifyContent: "center",
        alignItems: "flex-start",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF",

        paddingHorizontal: scale(32),
        paddingVertical: scale(48),
    },
    inputFields: {
        flexDirection: "column",
        width: "100%",
        gap: scale(16),
    },
});