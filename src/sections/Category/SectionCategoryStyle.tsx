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
});