import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.44,
        margin: 8,
    },
    topPart: {
        height: windowWidth * 0.2,
        // backgroundColor: "#CACACA",

        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,


        // height: verticalScale(85),
        backgroundColor: "#FF675BEE",

        // paddingHorizontal: 16,

        // borderTopLeftRadius: verticalScale(16),
        // borderTopRightRadius: verticalScale(16),
        alignItems: "center",
    },
    bottomPart: {
        // height: verticalScale(60),
        // backgroundColor: "#FBF5FF",

        // paddingVertical: verticalScale(8),
        // paddingHorizontal: verticalScale(16),
        
        // flexDirection: "column",
        // justifyContent: "space-evenly",
        // alignItems: "flex-start",
        
        height: windowWidth * 0.16,
        backgroundColor: "#FBF5FF",

        paddingVertical: 8,
        paddingHorizontal: 16,
        
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
    },
    lineContainer: {
        marginTop: verticalScale(12),
        height: 2,
        width: scale(180),
        borderColor: "white",
        backgroundColor: "white",

        opacity: 0.5,
    },
    verticalLine: {
        width: 1,
        marginVertical: scale(3),
        borderColor: "white",
        backgroundColor: "white",
    },
    buttonContainer: {
        // marginTop: verticalScale(8),
        // marginHorizontal: scale(20),
        height: windowWidth * 0.09,
        flexDirection: "row",
        justifyContent: "space-evenly",
        // backgroundColor: "#DBEBF3FF",
        backgroundColor: "#C1E8F8",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    buttonC: {
        flex: 1, 
        height: windowWidth * 0.09,
        paddingVertical: 4, 
        justifyContent: "center"
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