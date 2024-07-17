import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { PTFEButton, PTFELinkButton } from "src/components/button";
import styles from "./SectionCategoryStyle";
import { useNavigation } from "@react-navigation/native";

import CustomDropdown from "src/parts/Category/CustomDropDown";
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
    >([{ title: "Choose Categories", value: undefined, isCategory: true }]);
    const [selectedCategories, setSelectedCategories] = useState([])
    const navigation: any = useNavigation();

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = async () => {
        const data = await getAllQuestionsCategories();
        const options = [
            { title: "Choose Categories", value: undefined, isCategory: true, subCategories: [], isSelected: false },
        ];

        data.forEach((item: any, idx: number) => {
            options.push({
                title: item.name,
                value: item._id,
                isCategory: true,
                isSelected: false,
                subCategories: item.subcategories.map((subcategory: any, index: number) => ({
                    title: subcategory,
                    value: subcategory,
                    isCategory: false,
                    isSelected: idx == 0 && index == 0 ? true : false,
                })),
            });

        });

        setCategories(options);
    }

    useEffect(() => {
        console.log('>>>>>>', categories)
        console.log('>>>>>> selected', selectedCategories)
    }, [categories, selectedCategories])

    // const options = [
    //     { title: 'Cardiovascular & Pulmonary Systems', value: '1' },
    //     { title: 'Musculoskeletal System', value: '2' },
    //     { title: 'Neuromuscular & Nervous Systems', value: '3' },
    //     { title: 'Integumentary System', value: '4' },
    // ];

    const onSelect = (item: any) => {
        console.log('On sectionCategory', item);
        setSelectedCategories(item)
    };

    const onClick = () => {
        console.log(gameMode);
        if (!selectedCategories) {
            return
        }

        switch (gameMode) {
            case 0:
                navigation.navigate('Study', { quizID: selectedCategories, refresh: true });
                break;
            case 1:
                navigation.navigate('Classic', { quizID: selectedCategories, refresh: true });
                break;
            case 2:
                navigation.navigate('Survival', { quizID: selectedCategories, refresh: true });
                break;
            case 3:
                navigation.navigate('Scenario', { quizID: selectedCategories, refresh: true });
                break;
            case 4:
                navigation.navigate('Flashcards', { quizID: "All Topics", refresh: true, custom: false });
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
                    title="Choose Categories"
                    page="category"
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