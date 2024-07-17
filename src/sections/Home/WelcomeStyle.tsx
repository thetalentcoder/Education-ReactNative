import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderTopLeftRadius: scale(28),
        borderTopRightRadius: scale(28),
        paddingLeft: scale(28),
        paddingRight: scale(28),

        backgroundColor: "white",
    },

    activeDotContainer: {
        flex: 7,
        width: "100%",
    },

    swiperContainer: {
        flex: 18,
        width: "100%",
    },

    buttonContainer: {
        flex: 4.5,
        width: "100%",
    },

    textButtonContainer: {
        flex: 4,
        marginBottom: scale(16),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    text: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(14),
        color: "#999999",
        textAlignVertical: "center",
    },
});