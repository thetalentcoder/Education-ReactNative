import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop: 60,
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: verticalScale(28),
    },
    userInfoContainer: {
        position: "relative",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        height: verticalScale(32),
    },
    flameIcon: {
        width: verticalScale(32),
        height: verticalScale(32),
        resizeMode: "center",
        opacity: 0.7,
    },
    streakTextContainer: {
        // position: "absolute",
        height: verticalScale(32),
        marginRight: verticalScale(8),
        top: 0,
        left: 0,
        zIndex: 1,

        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: "red",
    },
    streakText: {
        fontFamily: "circular-std-medium",
        color: "#FFFFFF",
        fontSize: moderateScale(16),
        zIndex: 2,
    },
    scoreContainer: {
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "center",
        width: verticalScale(100),
        height: verticalScale(36),
        borderRadius: verticalScale(18),
        backgroundColor: "#FF675B",
    },
    scoreText: {
        fontFamily: "circular-std-medium",
        color: "white",
        fontSize: moderateScale(13),
    }
});