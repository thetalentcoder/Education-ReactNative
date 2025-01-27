import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const DropdownComponent = ({ options, selectedOption, setSelectedOption }) => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select an option:</Text>
            <SelectDropdown
                data={options}
                onSelect={(selectedItem, index) => {
                    setSelectedOption(selectedItem);
                }}
                defaultButtonText="Select an option..."
                buttonTextAfterSelection={(selectedItem, index) => {
                    return `${selectedItem} Question${selectedItem > 1 ? 's' : ''}`;
                }}
                rowTextForSelection={(item, index) => {
                    return `${item} Question${item > 1 ? 's' : ''}`;
                }}
                buttonStyle={styles.dropdownButton}
                buttonTextStyle={styles.dropdownButtonText}
                dropdownStyle={styles.dropdown}
                rowStyle={styles.dropdownRow}
                rowTextStyle={styles.dropdownRowText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: "100%",
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    dropdownButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdownButtonText: {
        fontSize: 16,
        textAlign: 'left',
    },
    dropdown: {
        backgroundColor: '#EFEFEF',
    },
    dropdownRow: {
        backgroundColor: '#FFF',
        borderBottomColor: '#C5C5C5',
    },
    dropdownRowText: {
        fontSize: 16,
        textAlign: 'left',
    },
});

export default DropdownComponent;
