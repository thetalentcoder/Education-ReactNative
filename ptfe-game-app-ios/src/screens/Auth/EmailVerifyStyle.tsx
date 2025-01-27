import { StyleSheet, Dimensions } from 'react-native';

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
    height: windowHeight,
  },
  sectionEmailVerify: {
    height: windowHeight * 0.3,
    width: '100%',
  },
})