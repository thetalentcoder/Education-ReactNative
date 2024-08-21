import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, scale } from "src/config/scale";

type Props = {
    text: string;
    color: string;
    underlined: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export default function PTFELinkButton({
    text,   // Button Text
    color,   // Button Text Color
    underlined,    // Button Text Underlined
    disabled,    // Button Disabled
    onClick,   // Button Click Handler
}: Props) {
    return (
        <TouchableOpacity style={[styles.container]} onPress={onClick} disabled={disabled}>
            <Text style={[
                styles.text, 
                { color: color },
                underlined ? {textDecorationLine: "underline"} : {},
            ]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: 'circular-std-medium',
    fontSize: moderateScale(14),
  }
})