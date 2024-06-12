import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { moderateScale, scale, verticalScale } from "src/config/scale";

type Props = {
    text: string;
    color: string;
    checked: boolean;
    setChecked: (newValue: boolean) => void;
}

export default function PTFECheckBox({
    text,   // CheckBox Text
    color,   // CheckBox Background Color
    checked,
    setChecked,
}: Props) {
    const handleClick = () => {
        setChecked(!checked);
    }
    
    return (
        <>
            <TouchableOpacity style={styles.container} onPress={handleClick}>
                <Checkbox
                style={styles.checkbox}
                value={checked}
                onValueChange={handleClick}
                color={checked ? color : undefined}
                />
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    height: scale(18),
    width: scale(18),
    borderRadius: verticalScale(6),
  },
  text: {
    paddingLeft: 8,
    fontFamily: 'poppins-regular',
    fontSize: scale(14),
    color: "#999999",
  }
})