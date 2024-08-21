import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 32 / 93,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    statusContainer: {
        height: windowHeight * 15 / 93,
        width: "100%",
    },
    mainContent: {
        width: "100%",
        bottom: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF"   
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: scale(350),
        backgroundColor: 'white',
        padding: moderateScale(20),
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    space: {
        width: "100%",
        marginVertical: verticalScale(20),
    },
    space1: {
        width: "100%",
        marginVertical: verticalScale(12),
    }
});