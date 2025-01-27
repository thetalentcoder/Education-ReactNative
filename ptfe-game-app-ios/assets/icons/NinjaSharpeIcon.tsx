import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, G } from "react-native-svg";

export default function NinjaSharpeIcon() {
  return (
    <View style={styles.container}>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 580 580"
      >
        <G>
          <Path
            d="M461 351c0-23.472-19.028-42.5-42.5-42.5h-43.543l30.625-105h62.918c23.472 0 42.5-19.028 42.5-42.5 0-23.472-19.028-42.5-42.5-42.5h-38.127l18.697-64.102c7.933-27.199-12.466-54.398-40.799-54.398-18.888 0-35.51 12.466-40.798 30.599l-25.639 87.901h-91.461l18.697-64.102c7.933-27.199-12.466-54.398-40.799-54.398-18.888 0-35.51 12.466-40.798 30.599l-25.639 87.901h-68.334c-23.472 0-42.5 19.028-42.5 42.5 0 23.472 19.028 42.5 42.5 42.5h43.543l-30.625 105h-62.918c-23.472 0-42.5 19.028-42.5 42.5 0 23.472 19.028 42.5 42.5 42.5h38.126l-18.696 64.102c-7.933 27.199 12.466 54.398 40.799 54.398 18.888 0 35.51-12.466 40.799-30.599l25.638-87.901h91.461l-18.696 64.102c-7.934 27.199 12.465 54.398 40.797 54.398 18.888 0 35.51-12.466 40.799-30.599l25.638-87.901h68.335c23.472 0 42.5-19.028 42.5-42.5zm-174.582-42.5h-91.461l30.625-105h91.461z"
            fill="#FFFFFFFF"
          />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 24, // Set a consistent height for all icons
    width: 24,  // Set a consistent width for all icons
    justifyContent: "center",
    alignItems: "center",
  },
});
