import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale, scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    subcontainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: "#FFFF",
        borderTopLeftRadius: scale(28),
        borderTopRightRadius: scale(28),
    },
    keyboardcontainer: {
        flex: 1,
        justifyContent: 'center',
      },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#FFDFFF",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 84 / 93,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        flexDirection: "column",
        justifyContent: 'flex-end',
        width: "100%",
    },
    sectionContentSlider: {
        width: '100%',
        height: "80%",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    textArea: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    questionContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});