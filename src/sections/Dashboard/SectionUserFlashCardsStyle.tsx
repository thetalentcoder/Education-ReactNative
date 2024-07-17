import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: verticalScale(28),
        paddingTop: verticalScale(32),
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
    space: {
        width: "100%",
        marginVertical: verticalScale(20),
    },
    space1: {
        width: "100%",
        marginVertical: verticalScale(12),
    }
});