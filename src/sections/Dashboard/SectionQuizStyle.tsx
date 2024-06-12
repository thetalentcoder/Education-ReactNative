import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: verticalScale(28),
        paddingVertical: verticalScale(32),
    },
    headerContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        alignItems: "center",
    },
    title: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(18),
        color: "#565656",
    },
    quizzesContainer: {
        marginTop: verticalScale(16),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(4),
        width: "100%",
    },
});