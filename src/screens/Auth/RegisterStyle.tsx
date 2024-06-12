import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from 'src/config/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#FFDFFF",
  },
  sectionRegister: {
    height: verticalScale(800),
    width: '100%',
  },
})