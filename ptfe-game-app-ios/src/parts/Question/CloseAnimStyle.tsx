import { StyleSheet, Dimensions } from "react-native";
import { scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    lottie: {
        display: 'none',
        position: 'absolute',

        left: windowWidth / 2 - scale(160),
        top: windowHeight / 2 - scale(260),
        width: scale(320),
        height: scale(320),

        zIndex: 1000,
        pointerEvents: 'none',
    }
});