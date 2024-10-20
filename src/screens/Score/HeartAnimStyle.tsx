import { StyleSheet, Dimensions } from "react-native";
import { verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    lottie: {
        position: 'absolute',
        width: windowWidth * 2,
        height: windowWidth * 2,
        alignSelf: 'center',
        zIndex: 2,
    }
});