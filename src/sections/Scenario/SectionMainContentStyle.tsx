import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "flex-start",
  },
  innerContainer: {
    width: "100%",
    position: "relative",
    marginTop: verticalScale(64),
    paddingHorizontal: scale(32),
  },

  timerContainer: {
    position: "absolute",

    justifyContent: "center",
    alignItems: "center",

    top: -verticalScale(44),
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
  statisticsContainer: {
    width: "100%",
    marginBottom: moderateScale(32),
  },
  statisticsText: {
    backgroundColor: "#87C6E8",
    textAlign: "center",
    paddingVertical: moderateScale(8),
    borderRadius: 4,
    color: "white",
  },
  explainButtonContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: verticalScale(16),
  },
  questionText: {
    fontFamily: "segoe-ui",
    fontSize: moderateScale(18),
    color: "#363636FF",
    textAlign: "left",
  },
  answersContainer: {
    width: "100%",
    gap: moderateScale(12),
  },
  buttonContainer: {
    width: "100%",
    gap: moderateScale(12),
    marginVertical: moderateScale(16),
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
