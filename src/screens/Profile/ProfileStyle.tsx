import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
    },
    innerContainer: {
        width: "100%",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 0.35,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    mainContent: {
        width: "100%",
        marginTop: verticalScale(175),
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: scale(48),
        gap: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    mainContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
    },
    avatarContainer: {
        width: verticalScale(120),
        height: verticalScale(120),
        borderRadius: verticalScale(60),
        alignSelf: "center",

        backgroundColor: "#CCCCCC",
    },
    inputFieldsContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    inputFields: {
        flexDirection: "column",
        width: "100%",
        gap: scale(16),
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: scale(16),
    },
    button1Wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button2Wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center',
    },
});
