import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    margin2: {
        height: 2,
    },
    margin4: {
        height: 4,
    },
    margin8: {
        height: 8,
    },
    margin16: {
        height: 16,
    },
    margin32: {
        height: 32,
    },
    margin64: {
        height: 64,
    },
});