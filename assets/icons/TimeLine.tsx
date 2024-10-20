import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { verticalScale, moderateScale } from "src/config/scale";

export default function TimeLine() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("assets/images/chore/milestone-2.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(15)
  },
  img: {
    height: verticalScale(60),
    width: verticalScale(60)
  },
});
