import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        
        backgroundColor: "#FF615B",
        width: "100%",
        height: verticalScale(90),
        borderRadius: verticalScale(20),

        marginBottom: verticalScale(16),
    },
    numberContainer: {
        marginLeft: verticalScale(16),
        backgroundColor: "#8B7CE8",

        width: verticalScale(60),
        height: verticalScale(60),
        borderRadius: verticalScale(8),
        
        justifyContent: "center",
        alignContent: "center",
    },
    rankingText: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(16),
        color: "white",
        textAlign: "center",
    },
    nameContainer: {
        flex: 4,
        marginLeft: verticalScale(16),
        height: verticalScale(60),
        justifyContent: "center",
        alignContent: "center",
    },
    nameText: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(18),
        color: "white",
        textAlign: "left",
    },
    scoreContainer: {
        flex: 2,
        marginRight: verticalScale(20),
        height: verticalScale(60),
        justifyContent: "center",
        alignContent: "center",
    },
    scoreText: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(18),
        color: "white",
        textAlign: "right",
    },
});