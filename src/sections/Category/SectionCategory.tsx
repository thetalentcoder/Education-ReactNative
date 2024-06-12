import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { PTFEButton, PTFELinkButton } from "src/components/button";
import styles from "./SectionCategoryStyle";
import { useNavigation } from "@react-navigation/native";

import CustomDropdown from "src/parts/Ranking/CustomDropDown";
import { getAllQuestionsCategories } from "src/actions/question/question";
import { gameModeString } from "src/constants/consts";

type Props = {
    gameMode: number;
    goBack: () => void;
}

export default function SectionCategory({
    gameMode,
    goBack,
}: Props) {
    const [categories, setCategories] = useState<
        { title: string; value: string | undefined, isCategory: boolean }[]
    >([{ title: "Choose a Category", value: undefined, isCategory: true }]);
    const [selectedCategory, setSelectedCategory] = useState('')
    const navigation: any = useNavigation();

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = async () => {
        const data = await getAllQuestionsCategories();
        const options = [
            { title: "Choose a Category", value: undefined, isCategory: true, },
        ];

        data.forEach((item: any) => {
            options.push({
                title: item.name,
                value: item._id,
                isCategory: true,
            });
            item.subcategories.forEach((subcategory: any) => {
                options.push({
                    title: subcategory, // Adding spaces for indentation
                    value: subcategory,
                    isCategory: false,
                });
            });
        });

        setCategories(options);
    }

    useEffect(() => {
        console.log('>>>>>>', categories)
        console.log('>>>>>> selected', selectedCategory)
    }, [categories, selectedCategory])

    // const options = [
    //     { title: 'Cardiovascular & Pulmonary Systems', value: '1' },
    //     { title: 'Musculoskeletal System', value: '2' },
    //     { title: 'Neuromuscular & Nervous Systems', value: '3' },
    //     { title: 'Integumentary System', value: '4' },
    // ];

    const onSelect = (item: any) => {
        console.log('On sectionCategory', item.value);
        setSelectedCategory(item.value)
    };

    const onClick = () => {
        console.log(gameMode);
        if (!selectedCategory) {
            return
        }

        switch (gameMode) {
            case 0:
                navigation.navigate('Study', { quizID: selectedCategory, refresh: true });
                break;
            case 1:
                navigation.navigate('Classic', { quizID: selectedCategory, refresh: true });
                break;
            case 2:
                navigation.navigate('Survival', { quizID: selectedCategory, refresh: true });
                break;
            case 3:
                navigation.navigate('Scenario', { quizID: selectedCategory, refresh: true });
                break;
            default:
                navigation.navigate('Question', { quizID: "6653447b75888277b055e2ec" });
                break;
        }
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.gameModeTextContainer}>
                <Text style={styles.gameModeText}>Game Mode: {gameModeString[gameMode]}</Text>
            </View> */}
            <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryText}>Select Category: </Text>
            </View>
            <View style={styles.categorySelect}>
                <CustomDropdown
                    options={categories}
                    onSelect={onSelect}
                    title="Choose a Category"
                />
            </View>
            <View style={styles.buttonContainer}>
                <PTFEButton
                    text="SELECT"
                    type="rounded"
                    color="#FF675B"
                    onClick={onClick}
                />
            </View>
        </View>
    );
}