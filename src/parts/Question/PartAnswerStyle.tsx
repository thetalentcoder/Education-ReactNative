import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        flexDirection: "row",

        justifyContent: "flex-start",
        alignItems: "center",

        width: "100%",
        minHeight: moderateScale(65),

        backgroundColor: "#F2F2F2",
        borderRadius: moderateScale(8),
    },
    columnIndex: {
        justifyContent: "center",
        alignItems: "center",
        width: "15%",
    },
    circle: {
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        aspectRatio: 1,

        borderRadius: 1000,
        backgroundColor: "transparent",
        borderColor: "#363636FF",
        borderWidth: scale(1),
    },
    index: {
        fontFamily: "circular-std-black",
        fontSize: moderateScale(14),
        color: "#363636FF",
    },
    columnContent: {
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: scale(8),
        marginRight: scale(8),
        paddingVertical: moderateScale(4),

        width: "75%",
    },
    content: {
        fontFamily: "poppins-regular",
        fontSize: moderateScale(14),
        color: "#363636FF",
    }
});