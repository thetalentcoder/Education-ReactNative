import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingLeft: 32,
        paddingRight: 32,

        backgroundColor: "white",
    },

    topImageContainer: {
        flex: 18,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonContainer: {
        flex: 12,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    
    text: {
        fontFamily: "circular-std-medium",
        fontSize: 22,
        color: "#777777",
        textAlign: "center",
    },

    textRemainTime: {
        fontFamily: "circular-std-black",
        fontSize: 60,
        color: "#FF675B",
        textAlign: "center",
    },
});