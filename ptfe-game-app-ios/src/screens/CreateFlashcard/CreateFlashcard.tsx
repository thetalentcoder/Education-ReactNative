import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import styles from "./CreateFlashcardStyle."
import SectionHeader from 'src/sections/Common/SectionHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { PTFEButton } from 'src/components/button';
import SectionMainContent from 'src/sections/CreateFlashcards.tsx/SectionMainContent';

type Props = {
    route?: any;
    navigation?: any;
}

export default function CreateFlashcard({ route, navigation }: Props) {
    const [title, setTitle] = useState(route.params?.title);
    const id = route.params?.id;
    const page = route.params?.page;
    const isEditPage = page == "edit" ? true : false;

    const gotoSelectFlashCardTitle = () => {
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView
        style={styles.keyboardcontainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient>
            <View style={styles.headerContainer}>
                <SectionHeader
                    title={isEditPage ? 'Edit Your Questions' : 'Add Your Questions'}
                    goBack={gotoSelectFlashCardTitle}
                />
            </View>
            <View style={styles.sectionContentSlider}>
                <SectionMainContent navigation={navigation} titleValue={title} id={id} page={page} />
            </View>
        </View>
        </KeyboardAvoidingView>
    );
}

