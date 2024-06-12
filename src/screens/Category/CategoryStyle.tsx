import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale } from 'src/config/scale';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#FFDFFF",
  },
  upperGradientContainer: {
    position: "absolute",
    width: "100%",
    height: windowHeight * 0.7,
  },
  headerContainer: {
    flex: 8,
    flexDirection: "column",
    justifyContent: 'flex-end',
    width: "100%",
  },
  statusContainer: {
    flex: 55,
    width: "100%",
  },
  sectionContentSlider: {
    flex: 30,
    width: '100%',
  },
})