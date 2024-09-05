import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./FlashcardQuizStyle";
import { PTFELinkButton } from "src/components/button";
import FlashCardIcon from "assets/icons/FlashCardIcon";
import { verticalScale } from "src/config/scale";

type Props = {
  id: string;
  title: string;
  categoryTitle: string;
  count: number;
  onDelete: (id: string) => void;
};

export default function FlashcardQuiz({
  id,
  title,
  categoryTitle,
  count,
  onDelete,
}: Props) {
  const navigation: any = useNavigation();

  const onClick = () => {
    navigation.navigate("CreateFlashcard", {
      title: title,
      id: id,
      page: "edit",
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Play", {
          screen: "Flashcards",
          params: { title: title, quizID: id, refresh: true, custom: true },
        });
      }}
    >
      <View style={styles.topPart}>
        <FlashCardIcon />
      </View>
      <View style={styles.bottomPart}>
        {/* <Text style={styles.categoryText}>{"Category Title"}</Text> */}
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.countText}>{`${count} Questions`}</Text>
      </View>
      {/* <View style={styles.lineContainer}></View> */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonC}>
          <PTFELinkButton
            text="Edit"
            color="#FFFFFF"
            underlined={false}
            onClick={onClick}
          />
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.buttonC}>
          <PTFELinkButton
            text="Remove"
            color="#FFFFFF"
            underlined={false}
            onClick={() => onDelete(id)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
