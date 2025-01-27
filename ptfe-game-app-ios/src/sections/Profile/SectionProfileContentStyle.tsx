import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "flex-start",

        position: "relative",
    },
    avatarContainer: {
        width: verticalScale(120),
        height: verticalScale(120),
        borderRadius: verticalScale(60),

        top: -verticalScale(90),
        left: windowWidth / 2 - verticalScale(60),
        position: "absolute",

        backgroundColor: "#FF675B",
    },
    avatar: {
        width: verticalScale(120),
        height: verticalScale(120),
        borderRadius: verticalScale(60),
    },
    userInfoContainer: {
        paddingTop: verticalScale(48),
        paddingHorizontal: scale(48),
        width: "100%",
    },
    progressContainer: {
        paddingTop: verticalScale(48),
        paddingHorizontal: scale(48),
        width: "100%",
    },
    recentQuizContainer: {
        paddingTop: verticalScale(48),
        paddingHorizontal: scale(40),
        width: "100%",
    },
});