import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { verticalScale } from "src/config/scale";

export default function NinjaEmailIcon({ size = verticalScale(26) }) {
  return (
    <View style={styles.container}>
      <Svg
        width={size}  // Set your preferred size
        height={size}
        viewBox="0 0 512 512"  // Adjust the viewBox based on your SVG dimensions
        fill="none"
      >
        {/* Replace this with your actual SVG path data */}
        <Path
          d="M466.234 199.333c0-35.841-29.159-65-65-65h-17.405V78.699c0-43.395-35.305-78.699-78.7-78.699H172.403c-43.395 0-78.699 35.304-78.699 78.699v178.837c0 42.001 30.46 77.022 70.45 84.133v25.511h-53.388c-35.841 0-65 29.159-65 65V512h386v-79.821c0-35.841-29.159-65-65-65h-53.388v-25.511c24.612-4.376 45.601-19.334 58.114-39.975l58.479 23.388 10.768-26.926c6.447-16.121 6.232-33.787-.609-49.746a64.937 64.937 0 0 0-13.481-20.076h39.584v-29zm-53.677 60.895c3.551 8.285 3.786 17.426.686 25.852l-30.962-12.383a85.49 85.49 0 0 0 1.547-16.162v-19.838l9.556 3.822c8.681 3.472 15.49 10.117 19.173 18.709zm-114.179 52.758h-15v62.546l-44.673 40.512-44.552-40.502v-62.557h-15c-30.575 0-55.45-24.875-55.45-55.451h230.125c.001 30.577-24.874 55.452-55.45 55.452zm103.388 119.193V482H210.635l93.531-84.821h62.6c19.299 0 35 15.701 35 35zm-326 0c0-19.299 15.701-35 35-35h62.589l43.024 39.113L165.978 482H75.766zM305.129 30c26.853 0 48.699 21.846 48.699 48.699v50.132c-10.112-6.489-22.119-10.271-35-10.271H158.704c-12.881 0-24.888 3.782-35 10.271V78.699C123.704 51.846 145.55 30 172.403 30zM436.22 198.333h-52.392v-34h17.405c18.966 0 34.456 15.162 34.987 34zM123.704 183.56c0-19.299 15.701-35 35-35h160.125c19.299 0 35 15.701 35 35v42.049H123.704z" 
          fill="#333333"  // Adjust fill color
        />
        <Path
          d="M176.766 172.085h30v30h-30zM270.766 172.085h30v30h-30z"
          fill="#333333"  // Additional paths if necessary
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // aspectRatio: 1,  // Keeps the icon square
    justifyContent: "center",
    alignItems: "center",
  },
});
