import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./PartAnswerStyle";

type Props = {
    index: string;
    content: string;
    enabled: boolean;
    mine?: boolean;
    correct?: boolean;
    clickable: boolean;
    onClick: () => void;
}

export default function PartAnswer({
    index,
    content,
    enabled,
    mine = false,
    correct = false,
    clickable,
    onClick,
}: Props) {
    return (
        <TouchableOpacity 
            style={[
                styles.container, 
                correct ? {backgroundColor: "#74F97B"} :
                mine ? {backgroundColor: "#FF675B"} :
                enabled ? {backgroundColor: "#87C6E8"}
                : {}]}
            onPress={onClick}
            disabled={!clickable}
        >
            <View style={styles.columnIndex}>
                <View 
                    style={[styles.circle, 
                        enabled || correct || mine ? 
                        {backgroundColor: "white", borderWidth: 0} : 
                        {} ]}
                >
                    <Text 
                        style={[styles.index, 
                            enabled || correct || mine ? {color:"#565656"} : {}
                        ]}
                    >
                        {index}
                    </Text>
                </View>
            </View>
            <View style={styles.columnContent}>
                <Text style={[styles.content, 
                    enabled || correct || mine ? {color: "white"} : {}
                    ]}
                >
                    {content}
                </Text> 
            </View>
        </TouchableOpacity>
    )
}