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
    column1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: "#FFFFFFA0",
        borderRightWidth: 1,
    },
    column2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: "#FFFFFFA0",
        borderRightWidth: 1,
    },
    column3: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        fontFamily: 'sf-protext-medium',
        fontSize: moderateScale(15),
        color: "white",
    }
});