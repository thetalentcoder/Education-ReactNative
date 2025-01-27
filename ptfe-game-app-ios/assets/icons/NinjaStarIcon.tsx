import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Svg, { Path, G } from "react-native-svg";


type NinjaStarIconProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export default function NinjaStarIcon({ size = 30, style }: NinjaStarIconProps) {
  return (
    <View style={[{ height: size, width: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <Svg
        viewBox="0 0 48 48"
        height="100%"
        width="100%"
      >
        <G id="Line">
          <Path
            d="M45.426 23.095L31.471 16.529 24.905 2.574c-.165-.35-.518-.574-.905-.574s-.74.224-.905.574l-6.566 13.955L2.574 23.095c-.35.165-.574.518-.574.905s.224.74.574.905l13.955 6.566 6.566 13.955c.165.35.518.574.905.574s-.74-.224.905-.574l6.566-13.955 13.955-6.566c.35-.165.574-.518.574-.905s-.224-.74-.574-.905zM24 30c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
            fill="#FFFFFFFF"
          />
        </G>
      </Svg>
    </View>
  );
}
