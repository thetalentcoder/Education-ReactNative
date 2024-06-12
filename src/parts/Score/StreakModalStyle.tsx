import { StyleSheet } from "react-native";
import { verticalScale, moderateScale, scale } from "src/config/scale";

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: -10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: moderateScale(10),
        elevation: 24,
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
        width: verticalScale(130),
        height: verticalScale(130),
        borderRadius: verticalScale(65),
        backgroundColor: "#FF675B",
        justifyContent: "center",
        alignItems: "center",
    },
    icon2: {
        width: verticalScale(20),
        height: verticalScale(20),
    },
    icon3: {
        width: verticalScale(40),
        height: verticalScale(40),
    },
    streakBoxNotChecked: {
        backgroundColor: 'gray',
        width: verticalScale(40),
        height: verticalScale(40),
        opacity: 0.7
    },
    streakBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: moderateScale(20),
        marginBottom: moderateScale(4)
    },
    streakDescriptionText: {
        color: 'gray',
        fontFamily: 'poppins-regular',
        fontSize: moderateScale(13),
        maxWidth: scale(200),
        textAlign: 'center',
        lineHeight: verticalScale(20),
    },
});
