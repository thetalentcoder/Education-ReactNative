import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#FF675BC0",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 27 / 93,
    },
    headerContainer: {
        flex: 8,
        width: "100%",
    },
    statusContainer: {
        flex: 20,
        width: "100%",
    },
    mainContent: {
        flex: 65,
        width: "100%",
        bottom: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF"   
    }
});