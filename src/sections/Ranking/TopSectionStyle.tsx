import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        padding: verticalScale(32),
    },
    seasonContainer: {
        marginTop: verticalScale(12),
        flexDirection: "row",
    },
    button: {
        width: scale(110),
        justifyContent: "center",
        alignItems: "center",
    },
    seasonTitle: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    seasonText: {
        textAlign: "center",
        fontFamily: "poppins-semibold",
        fontSize: moderateScale(22),
        color: "white",
    },
    currentSeasonText: {
        textAlign: "center",
        fontFamily: "poppins-semibold",
        fontSize: moderateScale(15),
        color: "white",
    },
    lineContainer: {
        marginTop: verticalScale(16),
        height: 2,
        width: "100%",
        borderColor: "white",
        backgroundColor: "white",

        opacity: 0.5,
    },
    dropDownContainer: {
        marginTop: verticalScale(16),
        width: "100%",
    },
    innerContainer: {
        marginTop: verticalScale(16),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
    },
    smallContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    place1: {
        backgroundColor: "purple",
        width: scale(100),
        height: verticalScale(180),
    },
    place2: {
        backgroundColor: "pink",
        width: scale(100),
        height: verticalScale(130),
    },
    place3: {
        backgroundColor: "#4444FF",
        width: scale(100),
        height: verticalScale(100),
    },
    number: {
        paddingTop: moderateScale(4),
        textAlign: "center",
        fontFamily: "poppins-semibold",
        fontSize: moderateScale(30),
        color: "white",
    },
});