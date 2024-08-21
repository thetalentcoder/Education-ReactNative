import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'flex-start',
    },
    innerContainer: {
        width: "100%",
        position: 'relative',
        marginTop: moderateScale(32),
        paddingHorizontal: scale(32),
    },
    timerContainer: {
        position: "absolute",

        justifyContent: 'center',
        alignItems: 'center',

        top: - verticalScale(44),
        left: windowWidth / 2 - verticalScale(44),
        width: verticalScale(88),
        height: verticalScale(88),
        borderRadius: verticalScale(45),

        backgroundColor: "white",
    },
    quizContainer: {
        width: "100%",
        marginVertical: moderateScale(32),
    },
    explainButtonContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: verticalScale(16),
    },
    questionText: {
        fontFamily: 'segoe-ui',
        fontSize: moderateScale(18),
        color: "#707070",
        textAlign: "left",
    },
    answersContainer: {
        width: '100%',
        gap: moderateScale(12),
    },
    buttonContainer: {
        width: '100%',
        gap: moderateScale(12),
        marginVertical: moderateScale(16),
    }
});