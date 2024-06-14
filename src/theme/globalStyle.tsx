import { StyleSheet, Dimensions } from "react-native";
import { moderateScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    margin2: {
        height: moderateScale(2),
    },
    margin4: {
        height: moderateScale(4),
    },
    margin8: {
        height: moderateScale(8),
    },
    margin16: {
        height: moderateScale(16),
    },
    margin32: {
        height: moderateScale(32),
    },
    margin64: {
        height: moderateScale(64),
    },
});