import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'src/config/scale';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },

  scrollView: {
    width: "100%",
  },

  backgroundCircle1: {
    zIndex: -2,
    position: "absolute",
    top: - scale(160),
    left: scale(168),
    width: '90%',
    height: scale(350),
    borderRadius: scale(350),
    transform: [
      {scaleX: 1.8},
    ],
    backgroundColor: "#87C6E8B8",
  },
  backgroundCircle2: {
    zIndex: -1,
    position: "absolute",
    top: verticalScale(50),
    right: - scale(50),
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
    borderWidth: scale(35),
    borderColor: "#70707070",
  },

  sectionUserInfo: {
    flex: 11,
    width: '100%',
  },

  sectionSlider: {
    flex: 30,
    width: '100%',
  },

  scrollViewArea: {
    flex: 43,
    width: "100%",
  },
  navBarArea: {
    flex: 10,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),

    borderWidth: 0.5,
    borderColor: "grey",
  },

  sectionGameMode: {
    marginTop: verticalScale(32),
    width: '100%',
  },

  sectionQuiz: {
    width: '100%',
  },
})