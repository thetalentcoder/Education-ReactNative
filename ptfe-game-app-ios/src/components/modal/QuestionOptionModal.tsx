import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'src/config/scale';
import { PTFEButton } from '../button';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './QuestionOptionModalStyle';
import SelectDropdown from 'react-native-select-dropdown';

type Props = {
    optionModalVisible: boolean;
    setOptionModalVisible: (newValue: boolean) => void; 
    onSelectQuestions: (newValue: any) => void;
}

const QuestionModal = ({ 
    optionModalVisible, 
    setOptionModalVisible, 
    onSelectQuestions 
}: Props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [1, 5, 10, 15, 20];
    const dropDownList = options.map(option => ({ title: `${option} Question${option > 1 ? 's' : ''}`, value: option}));

    const handleSelect = (selectedItem) => {
        setSelectedOption(selectedItem.value);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={optionModalVisible}
            onRequestClose={() => setOptionModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={{ 
                        fontSize: moderateScale(20), 
                        textAlign: 'center', 
                        fontFamily: 'circular-std-medium', 
                        paddingBottom: verticalScale(16) }}
                    >
                        Select the number of questions:
                    </Text>

                    <View style={styles.container}>
                        <SelectDropdown
                            data={dropDownList}
                            defaultValue={null}
                            onSelect={(selectedItem, index) => {
                                handleSelect(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || "Select option"}
                                        </Text>
                                        <FontAwesome5
                                            name="angle-down"
                                            style={styles.dropdownButtonIconStyle}
                                        />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            ...styles.dropdownItemStyle,
                                            ...(isSelected && { backgroundColor: "#888888" }),
                                        }}
                                    >
                                        <View style={styles.mainItem}>
                                            <Text style={styles.dropdownItemTxtStyle}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>

                    <View style={styles.space1}>
                        <View style={styles.buttonContainer}>
                            <PTFEButton 
                                text="CLOSE"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    setOptionModalVisible(false);
                                }}
                                height={scale(48)}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <PTFEButton 
                                text="SELECT"
                                type="rounded"
                                color="#FF675B"
                                onClick={() => {
                                    setOptionModalVisible(false);
                                    onSelectQuestions(selectedOption);
                                }}
                                height={scale(48)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default QuestionModal;
