import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(32),
        paddingVertical: verticalScale(16),
    },
    innerContainer: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: verticalScale(16),
        borderRadius: 4,
        backgroundColor: "#87C6E8",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: scale(350),
        backgroundColor: 'white',
        padding: moderateScale(16),
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    title: {
        textAlign: "left",
        alignSelf: "flex-start",
        fontFamily: 'circular-std-medium',
        fontSize: moderateScale(20),
        padding: scale(8),
    },
    content: {
        textAlign: "left",
        alignSelf: "flex-start",
        fontFamily: 'circular-std-medium',
        fontSize: moderateScale(18),
        padding: scale(8),
    },
    space: {
        padding: moderateScale(8),
    },
    column1: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: "#FFFFFFA0",
        borderRightWidth: 1,
    },
    column2: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: "#FFFFFFA0",
        borderRightWidth: 1,
    },
    column3: {
        flex: 3,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        fontFamily: 'sf-protext-medium',
        fontSize: moderateScale(13),
        color: "white",
        paddingLeft: moderateScale(4),
    }
});