import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome5 } from '@expo/vector-icons';
import { moderateScale } from 'src/config/scale';

type Props = {
  options: any,
  onSelect: (item: any) => void;
  title: string,
}

const CustomDropdown = ({
  options,
  onSelect,
  title
}: Props) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    if (onSelect) {
      const selectedOption = options.find((option: any) => option.value === value.value);
      onSelect(selectedOption);
    }
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={options}
        defaultValue={null}
        onSelect={(selectedItem, index) => {
          if (!selectedItem.isCategory) {
            handleSelect(selectedItem);
          }
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || title}
              </Text>
              <FontAwesome5 name="angle-down" style={styles.dropdownButtonIconStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            item.title !== title &&
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: '#888888' }),
                ...(item.isCategory && styles.categoryItemStyle)
              }}
              {...item.isCategory && { 'aria-disabled': true }}
            >
              <Text style={{
                ...styles.dropdownItemTxtStyle,
                ...(item.isCategory && styles.categoryItemTxtStyle)
              }}>
                {item.title}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: moderateScale(10),
  },
  dropdownButtonStyle: {
    width: "100%",
    height: moderateScale(50),
    backgroundColor: '#E9ECEF',
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonIconStyle: {
    fontSize: moderateScale(18),
    color: '#151E26',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: moderateScale(8),
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
    backgroundColor: "white"
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: '#151E26',
  },
  categoryItemStyle: {
    backgroundColor: '#f0f0f0'
  },
  categoryItemTxtStyle: {
    color: '#a0a0a0',
    fontStyle: 'italic'
  }
});

export default CustomDropdown;
