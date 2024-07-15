import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 58,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 0.35,
    },
    buttonContainer: {
        width: 320,
        height: 68,
        gap: 20,
        marginHorizontal: 20,
        marginBottom: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        gap: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center',
    },
});
