import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        
        paddingHorizontal: verticalScale(32),
        paddingTop: verticalScale(64),
    },
    timerContainer: {
        position: "absolute",

        justifyContent: 'center',
        alignItems: 'center',

        top: - verticalScale(45),
        left: windowWidth / 2 - verticalScale(45),
        width: verticalScale(90),
        height: verticalScale(90),
        borderRadius: verticalScale(45),

        backgroundColor: "white",
    },
    quizContainer: {
        flex: 4,
        width: "100%",
    },
    questionText: {
        fontFamily: 'segoe-ui',
        fontSize: moderateScale(18),
        color: "#707070",
    },
    answersContainer: {
        flex: 10,
        width: '100%',

        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
});