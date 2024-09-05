import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        // position: "relative",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: scale(16),
        // paddingVertical: 72,
    },
    starContainer: {
        zIndex: -1,
        position: "absolute",
        width: "100%",
    },
    avatarContainer: {
        width: verticalScale(120),
        height: verticalScale(120),
        borderRadius: verticalScale(60),
        marginTop: verticalScale(40),
        backgroundColor: "#C4C4C4",
    },
    avatar: {
        zIndex: 1,
        width: verticalScale(120),
        height: verticalScale(120),
        borderRadius: verticalScale(40),
    },
    complementText: {
        marginTop: verticalScale(12),
        fontFamily: "poppins-semibold",
        fontSize: moderateScale(26),
        color: "#FFFFFF",
    },
    profileText: {
        fontFamily: "poppins-semibold",
        fontSize: moderateScale(18),
        color: "#FFD967",
    },
    scoreSquare: {
        marginTop: verticalScale(12),
        justifyContent: "center",
        alignItems: "center",

        width: verticalScale(165),
        height: verticalScale(92),
        
        borderRadius: 16,

        marginBottom: 32,
        paddingTop: verticalScale(8),
        backgroundColor: "#FFD967",
    },
    scoreText: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(40),
        color: "#7B68ED",
    }
});