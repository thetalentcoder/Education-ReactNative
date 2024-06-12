import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'src/config/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#FFDFFF",
  },
  sectionContentSlider: {
    height: scale(450),
    width: '100%',
  },
})