import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale } from 'src/config/scale';

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#FFDFFF",
  },
  upperGradientContainer: {
    zIndex: -2,
    position: "absolute",
    top: 0,
    width: "100%",
    height: windowHeight * 65 / 93,
  },
  backgroundCircle1: {
    zIndex: -1,
    position: "absolute",
    top: scale(-10),
    left: scale(-30),
    width: scale(80),
    height: scale(80),
    borderRadius: 1000,
    backgroundColor: "#FFFFFF33",
  },
  backgroundCircle2: {
    zIndex: -1,
    position: "absolute",
    top: scale(-10),
    right: scale(-75),
    width: scale(150),
    height: scale(150),
    borderRadius: 1000,
    backgroundColor: "#FFFFFF24",
  },
  backgroundCircle3: {
    zIndex: -1,
    position: "absolute",
    top: verticalScale(170),
    left: scale(50),
    width: scale(340),
    height: scale(170),
    borderTopLeftRadius: scale(170),
    borderTopRightRadius: scale(170),
    backgroundColor: "#FFFFFF24",
  },
  backgroundSquare: {
    zIndex: -1,
    position: "absolute",
    top: verticalScale(170) + scale(170),
    left: scale(50),
    width: scale(340),
    height: scale(800),
    backgroundColor: "#FFFFFF24",
  },
  sectionLogin: {
    marginTop: verticalScale(287),
    height: verticalScale(645),
    width: '100%',
  },
})