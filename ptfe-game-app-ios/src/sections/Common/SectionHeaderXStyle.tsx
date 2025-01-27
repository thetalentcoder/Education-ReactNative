import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    titleContainer: {
        justifyContent: "flex-end",
        alignItems: 'center',
        height: "100%",
    },
    title: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(18),
        // fontFamily: "sf-protext-semibold",
        // fontSize: moderateScale(16),
        color: "white",
    },
    backContainer: {
        position: "absolute",
        left: scale(20),
        justifyContent: "flex-end",
        height: "100%",
    },
    back: {
    }
});