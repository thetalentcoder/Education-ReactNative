import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingTop: verticalScale(64),
    },

    problemSquareContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: verticalScale(32),
        paddingHorizontal: scale(32),
    },
    descriptionContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    item: {
        width: scale(60),
        height: scale(60),
        justifyContent: 'center',
        alignItems: 'center',
        margin: scale(5),
        borderRadius: verticalScale(4),
    },
    itemText: {
        fontFamily: "poppins-regular",
        fontSize: moderateScale(16),
        color: 'white',
    },

    quizContainer: {
        flex: 4,
        width: "100%",
        paddingHorizontal: verticalScale(32),
    },
    questionText: {
        fontFamily: 'segoe-ui',
        fontSize: moderateScale(18),
        color: "#707070",
        marginBottom: scale(16)
    },
    rationaleContainer: {
        paddingHorizontal: verticalScale(32),

        flex: 10,
        marginVertical: verticalScale(12),
        width: '100%',

        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    rationaleHeader: {
        fontFamily: 'circular-std-medium',
        fontSize: moderateScale(20),
        color: "#333333",
    },
    rationaleText: {
        fontFamily: 'segoe-ui',
        fontSize: moderateScale(18),
        color: "#707070",
    },
    answersContainer: {
        paddingHorizontal: verticalScale(32),

        flex: 10,
        marginTop: verticalScale(24),
        marginBottom: verticalScale(12),
        gap: moderateScale(8),
        width: '100%',

        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    lineContainer: {
        paddingHorizontal: verticalScale(32),

        marginTop: verticalScale(8),
        marginBottom: verticalScale(32),

        alignSelf: "center",

        height: 2,
        width: windowWidth - verticalScale(64),

        borderColor: "grey",
        backgroundColor: "grey",

        opacity: 0.5,
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
        zIndex: 1,
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      modalContent: {
        width: scale(380),
        maxHeight: verticalScale(720),
        backgroundColor: "white",
        paddingHorizontal: scale(32),
        paddingTop: moderateScale(24),
        paddingBottom: moderateScale(16),
        borderRadius: moderateScale(8),
        zIndex: 2,
      },
      scrollView: {
        width: scale(330),
      },
      textContainer: {
        width: "100%",
        flexDirection: "row",
        alignSelf: "flex-start",
      },
      title: {
        textAlign: "left",
        alignSelf: "flex-start",
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(20),
        padding: scale(8),
      },
      contentNo: {
        flex: 1,
        textAlign: "left",
        alignSelf: "flex-start",
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(18),
        padding: scale(8),
      },
      content: {
        flex: 10,
        textAlign: "left",
        alignSelf: "flex-start",
        fontFamily: "circular-std-medium",
        fontSize: moderateScale(18),
        padding: scale(8),
      },
      space8: {
        padding: moderateScale(8),
      },
      space16: {
        padding: moderateScale(24),
      },
      videoWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      vimeoVideoContainer: {
        marginTop: verticalScale(10),
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: verticalScale(450),
        borderRadius: moderateScale(12),
        backgroundColor: "grey",
      },
      photoContainer: {
        marginTop: verticalScale(10),
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: verticalScale(250),
        borderRadius: moderateScale(12),
        backgroundColor: "grey",
      },
});