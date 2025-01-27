import { StyleSheet, Dimensions } from "react-native";
import { moderateScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.36,
        margin: 8,
    },
    topPart: {
        height: windowWidth * 0.2,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: "#FF675BEE",
        alignItems: "center",
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