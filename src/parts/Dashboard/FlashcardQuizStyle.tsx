import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.42,
        margin: 8,
    },
    topPart: {
        height: windowWidth * 0.2,
        backgroundColor: "#CACACA",

        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    bottomPart: {
        height: windowWidth * 0.16,
        backgroundColor: "#FBF5FF",

        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,

        paddingVertical: 8,
        paddingHorizontal: 16,
        
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
    },
    buttonContainer: {
        marginTop: verticalScale(8),
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    titleText: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(16),
        color: "black",
    },
    categoryText: {
        fontFamily: "poppins-regular",
        fontSize: moderateScale(11),
        color: "grey",
    },
    countText: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(13),
        color: "black",
    },
});