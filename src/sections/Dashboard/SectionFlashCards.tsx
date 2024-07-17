import React from "react";
import { View, Text } from "react-native";

import texts from "src/config/texts";

import styles from "./SectionFlashCardsStyle";
import PartGameMode from "src/parts/Dashboard/PartGameMode";


export default function SectionFlashCards() {

    const renderFlashCard = () => {
        return (
            <>
                {/* <PartGameMode
                    key={4}
                    index={4}
                    icon={'FlashCards'}
                    title={'Flashcards Mode'}
                    statusText={"Fun way to study"}
                    buttonText={"Start"}
                /> */}
                <PartGameMode
                    key={5}
                    index={5}
                    icon={'FlashCards'}
                    title={'Flashcard Deck'}
                    statusText={"Fun way to study"}
                    buttonText={"Create"}
                />
            </>
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{texts.txt_screen_dashboard_title2}</Text>
            </View>
            <View style={styles.flashcardContainer}>{renderFlashCard()}</View>
        </View>
    );
}