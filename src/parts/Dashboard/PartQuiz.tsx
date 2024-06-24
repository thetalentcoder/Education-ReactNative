import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./PartQuizStyle";

type Props = {
    id: string,
    title: string;
    categoryTitle: string;
    count: number;
}

export default function PartQuiz({
    id,
    title,
    categoryTitle,
    count,
}: Props) {
    const navigation:any = useNavigation();

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => {
                navigation.navigate('Play', {
                    screen: 'Question',
                    params: { quizID: id },
                });
            }}
        >
            <View style={styles.topPart}>
            </View>
            <View style={styles.bottomPart}>
                <Text style={styles.categoryText}>{"Category Title"}</Text>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.countText}>{`${count} Questions`}</Text>
            </View>
        </TouchableOpacity>
    )
}