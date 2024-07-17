import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
        backgroundColor: "#FFFFFF",
    },
    innerContainer: {
        width: "100%",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 0.4,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    statusContainer: {
        // marginTop: verticalScale(8),
        flex: 4,
        width: "100%",
    },
    mainContent: {
        flex: 30,
        width: "100%",
        marginTop: verticalScale(32),
        paddingTop: verticalScale(32),
        paddingBottom: verticalScale(32),
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF"
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: scale(32),
    },
});
