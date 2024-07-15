import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        backgroundColor: "white",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        top: 0,
        height: windowHeight * 0.65,
        zIndex: -1,
    },
    headerContainer: {
        flex: 8,
        width: "100%",
    },
    statusContainer: {
        flex: 50,
        width: "100%",
    },
    mainContent: {
        width: "100%",
        flex: 32,
        bottom: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF",
        zIndex: 5,
    }
});