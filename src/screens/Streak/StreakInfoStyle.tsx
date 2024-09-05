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
        height: windowHeight * 0.8,
    },
    scrollContainer: {
        width: "100%",
    },
    innerContainer: {
        width: "100%",
        alignItems: "center",
        paddingTop: verticalScale(16),
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
    vimeoVideoContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: '80%',
        height: verticalScale(450),
        borderRadius: moderateScale(12),
        backgroundColor: "grey",
    },
    video: {
      width: '100%',
      height: verticalScale(450),
    },
    mainContent: {
        width: "100%",
        // marginTop: scale(32),
        paddingTop: scale(32),
        paddingBottom: scale(32),
        borderTopLeftRadius: moderateScale(32),
        borderTopRightRadius: moderateScale(32),
        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        width: "80%",
        alignItems: "center",
        marginBottom: verticalScale(16),
    },
    title: {
        fontFamily: "circular-std-black",
        fontSize: moderateScale(18),
    },
    contentContainer: {
        width: "80%",
        alignItems: "flex-start",
        marginBottom: verticalScale(16),
    },
    content: {
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(16),
        textAlign: "left",
    },
    buttonContainer: {
        width: "80%",
        alignItems: "flex-start",
    },
});
