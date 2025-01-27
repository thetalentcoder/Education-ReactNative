import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',

        borderTopLeftRadius: scale(28),
        borderTopRightRadius: scale(28),
        padding: scale(28),
        paddingBottom: scale(150),
        backgroundColor: "white",
    },
    categoryText: {
        fontFamily: "sf-protext-semibold",
        fontSize: moderateScale(16),
    },
    gameModeText: {

    },
    gameModeTextContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryTextContainer: {
        width: "100%",
        justifyContent: "center",
    },
    categorySelect: {
        paddingVertical: verticalScale(8),
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        paddingTop: verticalScale(8),
        gap: verticalScale(8),
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: "90%",
        backgroundColor: 'white',
        paddingTop: moderateScale(32),
        paddingBottom: moderateScale(8),
        paddingHorizontal: moderateScale(16),
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    space: {
        width: "100%",
        marginVertical: verticalScale(20),
    },
    space1: {
        width: "90%",
        marginVertical: verticalScale(12),
    }
});