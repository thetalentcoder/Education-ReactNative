import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: "relative",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingHorizontal: verticalScale(32),
        paddingVertical: verticalScale(16),
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        textAlign: "center",
        fontFamily: "segoe-ui",
        fontSize: 18,
        color: "#707070",
    },
    // shareButtonContainer: {
    //     flex: 15,
    //     flexDirection: "row",
    //     justifyContent: "space-evenly",
    //     alignItems: "center",
    //     width: "100%",
    //     paddingHorizontal: verticalScale(32),
    //     marginBottom: verticalScale(32),
    // },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    
});