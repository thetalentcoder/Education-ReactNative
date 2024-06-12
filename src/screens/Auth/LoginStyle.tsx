import { StyleSheet, Dimensions } from 'react-native';

import { verticalScale } from 'src/config/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#FFDFFF",
  },
  sectionLogin: {
    height: verticalScale(645),
    width: '100%',
  },
})