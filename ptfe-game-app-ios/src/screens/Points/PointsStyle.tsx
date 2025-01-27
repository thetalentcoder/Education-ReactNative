import { StyleSheet, Dimensions } from "react-native";
import { verticalScale, moderateScale, scale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").height;

const screenWidth = Dimensions.get("screen").width;


export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
        backgroundColor: 'white',
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 0.4,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: scale(10),
        padding: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(50)
    },
    modalText: {
        fontSize: moderateScale(20),
        marginBottom: scale(20),
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: scale(5),
        padding: scale(10),
        width: '100%',
        alignItems: 'center'
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    streakDetails: {
        backgroundColor: "#87C6E8",
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: scale(12),
        paddingVertical: scale(12),
    },
    calendar: {
        width: screenWidth * 8 / 10,
        gap: verticalScale(15),
    },
    longestMilstone: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
    },
    infoIcon: {
        position: "absolute",
        top: moderateScale(-4),
        right: moderateScale(4),
        width: moderateScale(28),
        height: moderateScale(28),
    },
    infoButton: {
        position: "relative",
        width: moderateScale(28),
        height: moderateScale(28),
    },
    longestMilstoneText: {
        fontFamily: "circular-std-black",
        fontSize: moderateScale(18),
        color: "white",
    },
    split: {
        height: '100%',
        width: 1,
        backgroundColor: 'white',
    },
    streakDetailsDesp: {
        maxWidth: scale(80),
        marginTop: moderateScale(4),
        fontFamily: "poppins-regular",
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        textAlign: 'center',
        color: "white",
    },
    innerContainer: {
        width: "100%",
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    statusContainer: {
        // marginTop: verticalScale(8),
        flex: 4,
        marginTop: scale(32),
        marginHorizontal: scale(32),
    },
    mainContent: {
        flex: 30,
        width: "100%",
        marginTop: scale(32),
        paddingTop: scale(32),
        paddingBottom: scale(32),
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",
        
        
    }
});
