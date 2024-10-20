import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { PTFEButton } from "src/components/button";
import styles from "./PartGameModeStyle";
import { moderateScale, scale } from "src/config/scale";

import StudyModeIcon from "assets/icons/StudyModeIcon";
import ClassicModeIcon from "assets/icons/ClassicModeIcon";
import SurvivorModeIcon from "assets/icons/SurvivorModeIcon";
import ScenarioModeIcon from "assets/icons/ScenarioModeIcon";
import FlashCardIcon from "assets/icons/FlashCardIcon";
import { useSelector } from "react-redux";
import { flashCardCountLimit } from "src/constants/consts";

type Props = {
  index: number;
  icon: string;
  title: string;
  statusText: string;
  buttonText: string;
};

export default function PartGameMode({
  index,
  icon,
  title,
  statusText,
  buttonText,
}: Props) {
  const user = useSelector((state) => state.userData.user);
  const navigation: any = useNavigation();
  const [currentFlashCards, setCurrentFlashCards] = useState(user?.flashCards);
  const [closeModalVisible, setCloseModalVisible] = useState(false);

  useEffect(() => {
    setCurrentFlashCards(user?.flashCards);
  }, [user]);

  console.log(icon);
  const onClickHandler = () => {
    if (index <= 4) {
      navigation.navigate("Play", {
        screen: "Category",
        params: { gameMode: index },
      });
    } else {
      if (currentFlashCards?.length >= flashCardCountLimit) {
        setCloseModalVisible(true);
        return;
      }
      navigation.navigate("Home", {
        screen: "SelectFlashcardTitle",
      });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onClickHandler} style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            {icon == "FlashCards" ? (
              <FlashCardIcon />
            ) : icon == "Study" ? (
              <StudyModeIcon />
            ) : icon == "Classic" ? (
              <ClassicModeIcon />
            ) : icon == "Survivor" ? (
              <SurvivorModeIcon />
            ) : icon == "Scenario" ? (
              <ScenarioModeIcon />
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {
            <PTFEButton
              text={buttonText}
              type="circle"
              color="#FF675B"
              onClick={onClickHandler}
            />
          }
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={closeModalVisible}
        onRequestClose={() => setCloseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: moderateScale(18), textAlign: "center" }}>
              {`You have reached the maximum amount of flashcard decks, please remove one before proceeding.`}
            </Text>
            <View style={styles.space1} />
            <View style={styles.space1}>
              <PTFEButton
                text={"Close"}
                type="rounded"
                color="#FF675B"
                height={scale(48)}
                onClick={() => setCloseModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
