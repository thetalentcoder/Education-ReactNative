import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Ellipse, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { verticalScale } from 'src/config/scale';

type Props = {
    topColor?: string,
    ranking?: number,
    height?: number,
}

const Cylinder = ({
    topColor = "#FF6DAA",
    ranking = 1,
    height = 200,
} : Props ) => {
  return (
    <View style={{ height: height, alignItems: 'center', justifyContent: 'flex-end'}}>
      <Svg height={height} width="100">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={topColor} stopOpacity="0.5" />
            <Stop offset="1" stopColor={"white"} stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={"white"} stopOpacity="0" />
            <Stop offset="1" stopColor={topColor} stopOpacity="0.2" />
          </LinearGradient>
        </Defs>

        <Ellipse cx="50" cy={height-30} rx="50" ry="20" fill="url(#grad1)" />

        <Text style={styles.text}>{ranking}</Text>

        <Rect x="0" y="30" width={100} height={height-60} fill="url(#grad)" />

        <Ellipse cx="50" cy="30" rx="50" ry="20" fill={topColor} />
      </Svg>
    </View>
  );
};

export default Cylinder;

const styles = StyleSheet.create({
    text: {
        top: 48,
        paddingTop: 4,
        textAlign: "center",
        fontFamily: "poppins-semibold",
        fontSize: 30,
        color: "white",
    }
});
