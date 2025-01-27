import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        backgroundColor: "#FF675BC0",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        top: 0,
        height: windowHeight * 0.9,
        zIndex: -1,
    },
    headerContainer: {
        flex: 8,
        width: "100%",
    },
    statusContainer: {
        flex: 25,
        width: "100%",
    },
    imageContainer: {
        flex: 30,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    grayImage: {
        aspectRatio: 1,
        width: '80%',
        height: 'auto',
        top: windowHeight * 0.02
    },
    mainContent: {
        width: "100%",
        flex: 40,
        bottom: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF",   
        zIndex: 5,
    }
});