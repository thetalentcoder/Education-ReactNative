import { StyleSheet } from "react-native";
import { verticalScale } from "src/config/scale";

export default StyleSheet.create({
    precontainer: {
        flex: 1,
        backgroundColor: "#b6c9d6",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: verticalScale(16),
        // backgroundColor: "white",
    },
    container: {
        flex: 1,
        backgroundColor: "#87C6E8",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: verticalScale(16),
        // backgroundColor: "white",
    },
    innerContainer: {
        width: "100%",
    },
    topSection: {
        flex: 1,
    },
    bottomSection: {
        flex: 1,
    }
});