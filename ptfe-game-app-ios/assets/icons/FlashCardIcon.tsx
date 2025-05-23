import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, G, Defs, ClipPath, Mask, Rect } from "react-native-svg";

export default function FlashCardIcon() {
  return (
    <View style={styles.container}>
      <Svg clip-rule="evenodd" fill="white" fill-rule="evenodd" height="70%" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 512 512" width="70%">
        <G id="Layer_x0020_1">
          <G id="_484777568">
            <G>
              <Path d="m126 363c-5 0-10-2-15-4-7-4-12-11-14-18l-68-256c-2-8-1-16 3-23 4-6 10-11 18-14l177-47c16-4 32 5 37 21l68 256c4 16-5 31-21 37l-177 47c-3 0-5 1-8 1zm-72-302c-4 2-8 5-10 8s-3 7-2 12h1l68 256c2 8 11 13 19 11l177-47c9-3 14-11 11-19l-68-256c-2-9-11-14-19-12z"/>
            </G>
            <G>
              <Path d="m311 419c-2 0-5-1-7-1-1 0-1 0-1 0l-176-48c-7-2-14-6-18-13-2-4-1-8 2-10 4-2 8-1 10 2 2 4 5 7 9 7h1l176 48c9 2 17-2 19-11l69-256c3-8-3-17-11-19l-114-31c-3-1-6-5-5-9s5-6 9-5l114 31c15 4 25 21 21 37l-69 256c-3 13-15 22-29 22z"/>
            </G>
            <G>
              <Path d="m267 512c-7 0-15-3-21-9l-130-129s0 0 0-1c-6-6-8-12-8-20 0-4 3-7 7-7s7 3 7 7 1 8 4 11l130 129c6 6 16 6 22 0l187-187c7-6 7-16 0-22l-83-84c-2-3-2-7 0-10 3-3 8-3 10 0l83 84c12 12 12 30 0 42l-187 187c-6 6-13 9-21 9z"/>
          </G>
        </G>
      </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});