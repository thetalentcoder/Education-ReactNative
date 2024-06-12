import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#FFDFFF",
  },
  sectionEmailVerify: {
    height: windowHeight * 0.3,
    width: '100%',
  },
})