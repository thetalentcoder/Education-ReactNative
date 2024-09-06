import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",

        marginBottom: verticalScale(16),
    },
    title: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(16),
        color: "#2C2C2C",
    },
    oneQuiz: {
        flexDirection: "row",

        height: verticalScale(80),
        width: "100%",
        padding: verticalScale(16),

        borderRadius: verticalScale(20),
        backgroundColor: "white",

        justifyContent: "space-between",
        alignItems: "center",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,

        elevation: scale(1),

        marginBottom: verticalScale(16),
    },
    icon: {
        width: verticalScale(48),
        height: verticalScale(48),
        borderRadius: verticalScale(8),

        backgroundColor: "#8270F6",

        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        marginHorizontal: verticalScale(16),

        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    column: {
        flexDirection: "column",
        width: "100%",
    },
    percentContainer: {
        width: verticalScale(48),
        height: verticalScale(48),
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(14),
        color: "#2C2C2C",
    },
    smallText: {
        fontFamily: "poppins-regular",
        fontSize: moderateScale(12),
        color: "#666666",
    },
    percentText: {
        fontFamily: "poppins-medium",
        fontSize: moderateScale(15),
        textAlign: 'center',
        color: "black",
        width: '100%',
    }
});