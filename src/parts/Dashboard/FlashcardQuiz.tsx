import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./FlashcardQuizStyle";
import { PTFELinkButton } from "src/components/button";

type Props = {
    id: string,
    title: string;
    categoryTitle: string;
    count: number;
    onDelete: (id: string) => void
}

export default function FlashcardQuiz({
    id,
    title,
    categoryTitle,
    count,
    onDelete

}: Props) {
    const navigation: any = useNavigation();

    const onClick = () => {
        navigation.navigate('CreateFlashcard', { title: title, id: id, page: 'edit' });
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate('Play', {
                    screen: 'Flashcards',
                    params: { title: title, quizID: id, refresh: true, custom: true },
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
            <View style={styles.buttonContainer}>
                <PTFELinkButton
                    text="Edit"
                    color="#7799FF"
                    underlined={false}
                    onClick={onClick}
                />
                <PTFELinkButton
                    text="Remove"
                    color="#444444"
                    underlined={false}
                    onClick={() => onDelete(id)}
                />
            </View>
        </TouchableOpacity>
    )
}