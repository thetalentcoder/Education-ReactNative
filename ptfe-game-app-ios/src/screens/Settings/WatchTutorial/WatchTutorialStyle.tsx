import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
        backgroundColor: "white",
    },
    innerContainer: {
        width: "100%",
    },
    upperGradientContainer: {
        position: "absolute",
        width: "100%",
        height: windowHeight * 0.25,
    },
    headerContainer: {
        height: windowHeight * 8 / 93,
        width: "100%",
    },
    mainContent: {
        width: "100%",
        marginTop: verticalScale(80),
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#FFFFFF"
    },
    mainContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: scale(32),
        paddingVertical: scale(48),
    },
    vimeoVideoContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: '80%',
        height: verticalScale(430),
        borderRadius: moderateScale(12),
        backgroundColor: "grey",
    },
    video: {
        width: '100%',
        height: verticalScale(450),
    },
    labelContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: scale(16),
    },
    toggleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        padding: scale(16),
    },
    avatarContainer: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        alignSelf: "center",

        backgroundColor: "#CCCCCC",
        
        top: -scale(100),
        left: windowWidth / 2 - scale(50) - scale(32),
        position: "absolute",
    },
    inputFieldsContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    inputFields: {
        flexDirection: "column",
        width: "100%",
        gap: scale(16),
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: scale(16),
        paddingHorizontal: windowWidth * 0.11,
    },
    button1Wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button2Wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        color: "#666666",
        fontFamily: 'circular-std-black',
        fontSize: moderateScale(18),
    },
});
