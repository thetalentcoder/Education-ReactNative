import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    userName: {
        fontFamily: "poppins-semibold",
        fontSize: moderateScale(18),
        color: "black",
        textAlign: "center",
    },
    userInfoContainer: {
        marginTop: verticalScale(16),
        // paddingHorizontal: verticalScale(16),
        paddingVertical: verticalScale(12),

        height: verticalScale(110),
        borderRadius: verticalScale(16),

        backgroundColor: "#87C6E8",

        flexDirection: "row",
    },
    columnWithLine: {
        flex: 1,
        borderRightColor: "white",
        borderRightWidth: 1,

        justifyContent: "center",
        alignItems: "center",
    },
    column: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",

        flexDirection: "column",

        rowGap: 0,
    },
    row1: {
        flex: 3,
        
        justifyContent: "flex-start",
        alignItems: "center",
    },
    row2: {
        flex: 2,
        
        justifyContent: "flex-start",
        alignItems: "center",
    },
    row3: {
        flex: 3,
        
        justifyContent: "flex-end",
        alignItems: "center",
    },
    statusText: {
        fontFamily: "poppins-semibold",
        fontSize: moderateScale(16),
        color: "white",
        textAlign: "center",
    },
    labelText: {
        fontFamily: "circular-std-black",
        fontSize: moderateScale(16),
        color: "white",
        textAlign: "center",
    },
});