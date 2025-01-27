import { StyleSheet, Dimensions } from "react-native";
import { verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    lottie: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        pointerEvents: 'none',
    }
});