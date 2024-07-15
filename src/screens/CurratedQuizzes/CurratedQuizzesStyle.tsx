import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale, scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#FFDFFF",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 84 / 93,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        flexDirection: "column",
        justifyContent: 'flex-end',
        width: "100%",
    },
    sectionContentSlider: {
        width: '100%',
        height: "80%",
    },
});