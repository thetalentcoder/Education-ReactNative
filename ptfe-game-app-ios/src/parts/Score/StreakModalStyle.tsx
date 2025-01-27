import { StyleSheet } from "react-native";
import { verticalScale, moderateScale, scale } from "src/config/scale";

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    modalText: {
        fontSize: moderateScale(20),
        marginBottom: moderateScale(20),
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: moderateScale(5),
        padding: moderateScale(10),
        width: '100%',
        alignItems: 'center'
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    icon: {
        width: verticalScale(200),
        height: verticalScale(200),
        borderRadius: verticalScale(100),
        backgroundColor: "#FF675B",
        justifyContent: "center",
        alignItems: "center",
    },
    icon2: {
        width: verticalScale(30),
        height: verticalScale(30),
    },
    icon3: {
        width: verticalScale(50),
        height: verticalScale(50),
    },
    streakBoxNotChecked: {
        backgroundColor: '#87C6E8',
        width: verticalScale(50),
        height: verticalScale(50),
        opacity: 0.7
    },
    streakBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        justifyContent: 'space-evenly',
        gap: moderateScale(6),
    },
    streakChild: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(2),
    },
    currentStreak: {
        color: "#FF675B"
    },
    streakCount: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: moderateScale(3),
    },
    streakCountText: {
        color: "#FF675B",
        fontSize: moderateScale(13),
    },
    streakDescription: {
        alignItems: 'center',
    },
    streakDescriptionHeader: {
        fontFamily: 'circular-std-black',
        fontSize: moderateScale(35),
        marginBottom: moderateScale(4),
        marginTop: moderateScale(15)
    },
    streakDescriptionText: {
        color: 'gray',
        fontFamily: 'poppins-regular',
        fontSize: moderateScale(13),
        maxWidth: scale(350),
        textAlign: 'center',
        lineHeight: verticalScale(20),
    },
    btn: {
        flexDirection: 'row',
        width: '100%',
    }
});
