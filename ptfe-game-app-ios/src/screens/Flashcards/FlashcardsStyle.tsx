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
        height: windowHeight * 32 / 93,
    },
    headerContainer: {
        flex: 8,
        width: "100%",
    },
    statusContainer: {
        flex: 15,
        width: "100%",
    },
    mainContent: {
        flex: 70,
        width: "100%",
        bottom: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF"   
    }
});