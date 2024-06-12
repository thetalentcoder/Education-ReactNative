import { StyleSheet, Dimensions } from "react-native";
import { scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    lottie: {
        position: 'absolute',

        left: windowWidth / 2 - scale(100),
        top: windowHeight / 2 - scale(200),
        width: scale(200),
        height: scale(200),

        zIndex: 1000,
        pointerEvents: 'none',
    }
});