import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale, scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
        borderTopLeftRadius: scale(28),
        borderTopRightRadius: scale(28),
        backgroundColor: "#FFF",
    },

    space: {
        width: "100%",
        marginVertical: verticalScale(20),
    },
    quizzesContainer: {
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(4),
        width: "100%",
    },

});