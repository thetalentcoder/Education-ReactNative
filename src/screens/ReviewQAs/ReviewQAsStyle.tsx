import { StyleSheet, Dimensions } from "react-native";
import { verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
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
        marginTop: verticalScale(32),
        flex: 10,
        width: "100%",
    },
    mainContent: {
        flex: 30,
        width: "100%",
        marginTop: verticalScale(32),
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF"
    }
});
