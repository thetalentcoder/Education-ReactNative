import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    icon: string;
    size: number; 
    color: string;
    onClick: () => void;
}

export default function PTFESquareButton({
    icon,   // Button Icon
    size,   // Button Size
    color,   // Button Background Color
    onClick,   // Button Click Handler
}: Props) {
    return (
        <TouchableOpacity style={{
            justifyContent: "center",
            alignItems: "center",
            width: size,
            height: size,
            borderRadius: size / 4,
            backgroundColor: color,
        }} onPress={onClick}>
            <FontAwesome5 name={icon} size={ size/2.5 } color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
})