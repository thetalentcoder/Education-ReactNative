import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Modal } from "react-native";
import { PTFEButton, PTFELinkButton } from "src/components/button";
import styles from "./SectionCategoryStyle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Toast from "react-native-simple-toast";

import CustomDropdown from "src/parts/Category/CustomDropDown";
import { getAllQuestionsCategories } from "src/actions/question/question";
import { gameModeString } from "src/constants/consts";
import { moderateScale, scale } from "src/config/scale";
import { rdx_setSelectedCategories } from "src/redux/userSlice";
import QuestionModal from "src/components/modal/QuestionOptionModal";

type Props = {
  gameMode: number;
  goBack: () => void;
};

export default function SectionCategory({ gameMode, goBack }: Props) {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<
    { title: string; value: string | undefined; isCategory: boolean }[]
  >([{ title: "No Category Selected", value: undefined, isCategory: true }]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [closeModalVisible, setCloseModalVisible] = useState(false);
  const navigation: any = useNavigation();

  const [optionModalVisible, setOptionModalVisible] = useState(false);

  const onSelectQuestions = useCallback(
    (option) => {
      navigation.navigate("Study", {
        quizID: selectedCategories,
        refresh: true,
        numberOfQuestions: option,
      });
    },
    [selectedCategories]
  );

  useEffect(() => {
    getAllCategories();
  }, []);

  const goToSetting = useCallback(() => {
    navigation.navigate("SettingScreen");
    return;
  }, [navigation]);

  const getAllCategories = async () => {
    const data = await getAllQuestionsCategories();
    if (data.success == false) {
      Toast.show(
        "Your game is only available on paid accounts. Subscribe to your account",
        5000
      );
      goToSetting();
    }
    const options = [
      {
        title: "No Category Selected",
        value: undefined,
        isCategory: true,
        subCategories: [],
        isSelected: false,
      },
    ];

    data.forEach((item: any, idx: number) => {
      options.push({
        title: item.name,
        value: item._id,
        isCategory: true,
        isSelected: true,
        subCategories: item.subcategories.map(
          (subcategory: any, index: number) => ({
            title: subcategory,
            value: subcategory,
            isCategory: false,
            isSelected: idx == 0 && index == 0 ? true : true,
          })
        ),
      });
    });

    setCategories(options);
  };

  useEffect(() => {}, [categories, selectedCategories]);

  // const options = [
  //     { title: 'Cardiovascular & Pulmonary Systems', value: '1' },
  //     { title: 'Musculoskeletal System', value: '2' },
  //     { title: 'Neuromuscular & Nervous Systems', value: '3' },
  //     { title: 'Integumentary System', value: '4' },
  // ];

  const onSelect = (item: any) => {
    setSelectedCategories(item);
  };

  const onClick = () => {
    console.log(selectedCategories);
    if (!selectedCategories || selectedCategories.length == 0) {
      setCloseModalVisible(true);
      return;
    }

    dispatch(rdx_setSelectedCategories(selectedCategories));

    if (gameMode == 0) {
      setOptionModalVisible(true);
    } else {
      switch (gameMode) {
        // case 0:
        //     navigation.navigate('Study', { quizID: selectedCategories, refresh: true });
        //     break;
        case 1:
          navigation.navigate("Classic", {
            quizID: selectedCategories,
            refresh: true,
          });
          break;
        case 2:
          navigation.navigate("Survival", {
            quizID: selectedCategories,
            refresh: true,
          });
          break;
        case 3:
          navigation.navigate("Scenario", {
            quizID: selectedCategories,
            refresh: true,
          });
          break;
        case 4:
          navigation.navigate("Flashcards", {
            quizID: "All Topics",
            refresh: true,
            custom: false,
          });
          break;
        default:
          navigation.navigate("Question", {
            quizID: "6653447b75888277b055e2ec",
          });
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.gameModeTextContainer}>
                <Text style={styles.gameModeText}>Game Mode: {gameModeString[gameMode]}</Text>
            </View> */}
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryText}>Select Content Category: </Text>
      </View>
      <View style={styles.categorySelect}>
        <CustomDropdown
          options={categories}
          onSelect={onSelect}
          title="No Category Selected"
          page="category"
        />
      </View>
      <View style={styles.buttonContainer}>
        <PTFEButton
          text="Start"
          type="rounded"
          color="#FF675B"
          onClick={onClick}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={closeModalVisible}
        onRequestClose={() => setCloseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: moderateScale(18), textAlign: "center" }}>
              {`You must select at least 1 category.`}
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

      <QuestionModal
        optionModalVisible={optionModalVisible}
        setOptionModalVisible={setOptionModalVisible}
        onSelectQuestions={onSelectQuestions}
      />
    </View>
  );
}
