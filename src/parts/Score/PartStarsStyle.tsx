import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
    },
});