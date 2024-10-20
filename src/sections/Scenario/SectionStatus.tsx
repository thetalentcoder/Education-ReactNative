import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import NinjaStarIcon from "assets/icons/NinjaStarIcon";
import NinjaSharpeIcon from "assets/icons/NinjaSharpeIcon";

import { formatNumberWithCommas } from "src/utils/util";
import styles from "./SectionStatusStyle";
import { moderateScale, verticalScale } from "src/config/scale";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PTFEButton } from "src/components/button";

const windowHeight = Dimensions.get("window").height;

type Props = {
  currentProbNumber?: number;
  totalProbCount?: number;
  currentScore?: number;
  topics?: string[];
  setTopicsModalVisible: (newValue: boolean) => void;
};

export default function SectionStatus({
  currentProbNumber = 0,
  totalProbCount = 0,
  currentScore = 0,
  topics = [],
  setTopicsModalVisible,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTopicsModalVisible(modalVisible);
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.column1}>
          <View>
            <NinjaSharpeIcon />
          </View>
          <Text style={styles.statusText}>
            &nbsp;{`${currentProbNumber}/${totalProbCount}`}
          </Text>
        </View>
        <View style={styles.column2}>
          <View>
            <NinjaStarIcon />
          </View>
          <Text style={styles.statusText}>
            &nbsp;{`${formatNumberWithCommas(currentScore)}`}
          </Text>
        </View>
        <View style={styles.column3}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <AntDesign
              name="appstore-o"
              size={moderateScale(20)}
              color="white"
            />
            <Text style={styles.statusText}>
              {topics.length > 1 ? `${topics.length} Topics` : `1 Topic`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <ScrollView style={styles.scrollViewContainer}>
              {/* <ScrollView> */}
              <View style={styles.space8}></View>
              <Text
                style={styles.title}
              >{`  Your game mode consists of:`}</Text>
              {topics.map((content, index) => {
                return (
                  <View style={styles.textContainer}>
                    <Text style={styles.contentNo}>{`${index + 1}.`}</Text>
                    <Text style={styles.content}>{`${content}`}</Text>
                  </View>
                );
              })}
              <View style={styles.space8}>
                <PTFEButton
                  text="CLOSE"
                  type="circle"
                  color="#FF675B"
                  height={verticalScale(56)}
                  onClick={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
              <View style={styles.space8}></View>
              {/* </ScrollView> */}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
