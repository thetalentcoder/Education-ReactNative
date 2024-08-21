import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        marginTop: verticalScale(80),
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    imageContainer: {
        flex: 1,
        marginTop: 58,
        backgroundColor: '#00000000',
        zIndex: 1,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    image: {
        width: verticalScale(300),
        height: verticalScale(300),
        borderRadius: 150,
        backgroundColor: "#DDDDDD",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 0.35,
        zIndex: 0,
    },
    buttonContainer: {
        width: scale(320),
        gap: 20,
        marginHorizontal: scale(20),
        marginBottom: verticalScale(30),
        alignItems: 'center',
        justifyContent: 'center',
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
