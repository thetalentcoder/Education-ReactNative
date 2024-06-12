import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "src/config/scale";

const windowHeight = Dimensions.get("window").height;

type Props = {
    text: string;
    type: string; 
    color: string;
    enabled?: boolean;
    onClick: () => void;
    height?: number;
}

export default function PTFEButton({
    text,   // Button Text
    type,   // Button Type
    color,   // Button Background Color
    enabled,
    onClick,   // Button Click Handler
    height,
}: Props) {
    switch(type) { 
        case 'rounded':
            return (
                <TouchableOpacity disabled={ enabled == undefined || !enabled ? false : true } 
                    style={[styles.container, 
                        (enabled == undefined || !enabled) ? { backgroundColor: color} : { backgroundColor: "grey" }
                    ]} 
                    onPress={onClick}
                >
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </TouchableOpacity>
            )
            break;
        case 'circle':
            return (
                <TouchableOpacity disabled={ enabled == undefined || !enabled ? false : true } 
                    style={[styles.container_ex, 
                        (enabled == undefined || !enabled) ? { backgroundColor: color} : { backgroundColor: "grey" }
                    ]} 
                    onPress={onClick}
                >
                    <Text style={styles.text_ex}>
                        {text}
                    </Text>
                </TouchableOpacity>
            )
            break;
     }
}

const styles = StyleSheet.create({
  container: {
    height: moderateScale(57.85),
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(12),
  },
  container_ex: {
    height: moderateScale(38),
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(18),
  },
  text: {
    color: "#FFFFFF",
    fontFamily: 'circular-std-black',
    fontSize: moderateScale(18),
  },
  text_ex: {
    color: "#FFFFFF",
    fontFamily: 'circular-std-medium',
    fontSize: moderateScale(13),
  },
})