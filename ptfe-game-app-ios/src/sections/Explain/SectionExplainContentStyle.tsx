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
        paddingTop: verticalScale(32),
    },

    problemSquareContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: verticalScale(32),
        paddingHorizontal: verticalScale(32),
    },
    item: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: verticalScale(5),
        borderRadius: verticalScale(4),
    },
    itemText: {
        fontSize: 16,
        color: 'white',
    },

    quizContainer: {
        flex: 4,
        width: "100%",
        paddingHorizontal: verticalScale(32),
    },
    rationaleHeader: {
        fontFamily: 'circular-std-medium',
        fontSize: moderateScale(20),
        color: "#333333",
        paddingBottom: verticalScale(4),
    },
    questionText: {
        fontFamily: 'segoe-ui',
        fontSize: moderateScale(18),
        color: "#707070",
    },
    answersContainer: {
        paddingHorizontal: verticalScale(32),
        marginVertical: verticalScale(12),
        gap: moderateScale(8),
        width: '100%',

        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    lineContainer: {
        paddingHorizontal: verticalScale(32),

        marginTop: verticalScale(32),
        marginBottom: verticalScale(32),

        alignSelf: "center",

        height: 2,
        width: windowWidth - verticalScale(64),

        borderColor: "grey",
        backgroundColor: "grey",

        opacity: 0.5,
    }
});