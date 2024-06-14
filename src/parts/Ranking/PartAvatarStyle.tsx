import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "red",
    },
    balloonContainer: {
        padding: 0, 
        justifyContent: "center", 
        alignItems: "center",
    },
    scoreText: {
        fontFamily: 'poppins-medium',
        color: "#7A67EC",
        textAlign: "center",
    },
    avatarContainer: {
        backgroundColor: "#CCCCCC",
        position: "relative",
    }
});