import React, { useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { PTFEButton } from "src/components/button";
import styles from "./SectionCategoryStyle";
import { useNavigation } from "@react-navigation/native";



export default function SectionCategory() {
    const [title, setTitle] = useState('');
    const navigation: any = useNavigation();

    const onClick = () => {
        navigation.navigate('CreateFlashcard', { title: title, id: '', page: 'create' });
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryText}>{"Flashcard Deck Title"}</Text>
                </View>
                <View style={styles.categorySelect}>
                    <TextInput
                        style={styles.textInput}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Title"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <PTFEButton
                        text="START"
                        type="rounded"
                        color="#FF675B"
                        enabled={title.length == 0}
                        onClick={onClick}
                    />
                </View>
            </View>
        </View>
    );
}