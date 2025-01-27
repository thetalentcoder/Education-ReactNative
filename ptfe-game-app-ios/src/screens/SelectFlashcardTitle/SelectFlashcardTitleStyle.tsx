import { createEntityAdapter } from '@reduxjs/toolkit';
import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'src/config/scale';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  upperGradientContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: windowHeight * 81 / 93,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    height: windowHeight * 8 / 93,
    flexDirection: "column",
    justifyContent: 'flex-end',
    width: "100%",
  },
  sectionContentSlider: {
    marginTop: verticalScale(662) - moderateScale(98),
    height: verticalScale(270),
    width: '100%',
  },
  vimeoVideoContainer: {
    position: "absolute",
    width: '70%',
    top: verticalScale(120),
    height: verticalScale(410),
    borderRadius: moderateScale(12),
    backgroundColor: "grey",
  },
  video: {
    width: '100%',
    height: verticalScale(410),
  }
})