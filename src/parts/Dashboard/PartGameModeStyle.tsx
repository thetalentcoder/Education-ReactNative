import { StyleSheet, Dimensions } from "react-native";
import { verticalScale, moderateScale, scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        marginTop: verticalScale(12),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        height: verticalScale(88),
        width: '100%',

        paddingHorizontal: moderateScale(16),

        backgroundColor: '#87C6E850',
        borderRadius: moderateScale(16),
    },
    iconContainer: {
        width: verticalScale(60),
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: verticalScale(58),
        height: verticalScale(58),
        borderRadius: 1000,
        backgroundColor: "#FF675B",
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 3,
        marginLeft: moderateScale(16),
        flexDirection: "column",
        justifyContent: "space-around",
    },
    statusText: {
        fontFamily: 'circular-std-medium',
        fontSize: moderateScale(14),
        color: "#FF675B",
    },
    title: {
        fontFamily: 'circular-std-medium',
        fontSize: moderateScale(18),
        color: "black",
    },
    buttonContainer: {
        width: verticalScale(100),
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    }
});