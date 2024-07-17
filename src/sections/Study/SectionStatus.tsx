import React, { useState } from "react";
import { View, Text, Dimensions, Modal } from "react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";

import { formatNumberWithCommas } from "src/utils/util";
import styles from './SectionStatusStyle'
import { moderateScale, verticalScale } from "src/config/scale";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PTFEButton } from "src/components/button";

const windowHeight = Dimensions.get("window").height;

type Props = {
    currentProbNumber?: number;
    totalProbCount?: number;
    currentScore?: number;
    topics?: string[];
}

export default function SectionStatus({
    currentProbNumber = 0,
    totalProbCount = 0,
    currentScore = 0,
    topics = []
}: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.column1}>
                    <FontAwesome5 name="star" size={moderateScale(20)} color="white" />
                    <Text style={styles.statusText}>&nbsp;{`${currentProbNumber}/${totalProbCount}`}</Text>
                </View>
                <View style={styles.column2}>
                    <Entypo name="check" size={moderateScale(18)} color="white" />
                    <Text style={styles.statusText}>&nbsp;{`${formatNumberWithCommas(currentScore)}`}</Text>
                </View>
                <View style={styles.column3}>
                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress={() => {setModalVisible(true)}
                    }
                    >
                        <AntDesign name="appstore-o" size={moderateScale(20)} color="white" />
                        <Text style={styles.statusText}>
                            {
                                topics.length > 1 ? `${topics.length} Topics` : topics?.at(0)?.slice(0, 12) + "..."
                            }
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
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>{`  Your game mode consists of:`}</Text>
                        {
                            topics.map((content, index) => {
                                return (
                                    <View style={styles.textContainer}>
                                        <Text style={styles.content}>
                                            {`${index + 1}.`}
                                        </Text>
                                        <Text style={styles.content}>
                                            {`${content}`}
                                        </Text>
                                    </View>
                                    
                                )
                            })
                        }
                        <View style={styles.space}></View>
                        <PTFEButton
                            text="CLOSE"
                            type="circle"
                            color="#FF675B"
                            onClick={() => {setModalVisible(false)}}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}