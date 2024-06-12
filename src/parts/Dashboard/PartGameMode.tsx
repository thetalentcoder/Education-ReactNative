import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { PTFEButton } from "src/components/button";
import styles from "./PartGameModeStyle";
import { moderateScale } from "src/config/scale";

type Props = {
    index: number;
    icon: string;
    title: string;
    statusText: string;
    buttonText: string;
}

export default function PartGameMode({
    index,
    icon,
    title,
    statusText,
    buttonText,
}: Props) {
    const navigation: any = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View style={styles.icon}>
                    <FontAwesome5 name={icon} size={moderateScale(21)} color="white" />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.statusText}>{statusText}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.buttonContainer}>
                {
                    <PTFEButton
                        text={buttonText}
                        type="circle"
                        color="#FF675B"
                        onClick={() => {
                            navigation.navigate('Play', {
                                screen: 'Category',
                                params: { gameMode: index },
                            });
                        }}
                    />
                }
            </View>
        </View>
    )
}