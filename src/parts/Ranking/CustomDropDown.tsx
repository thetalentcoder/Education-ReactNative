import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome5 } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "src/config/scale";
import Checkbox from "expo-checkbox";
import { PTFEButton } from "src/components/button";

type Props = {
  options: any;
  onSelect: (item: any) => void;
  title: string;
  page: string;
};

const CustomDropdown = ({ options, onSelect, title, page }: Props) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dropDownList, setDropDownList] = useState(options);

  useEffect(() => {
    setDropDownList(options);
  }, [options]);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    if (onSelect) {
      const selectedOption = options.find(
        (option: any) => option.value === value.value
      );
      onSelect(selectedOption);
    }
  };

  return (
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
                {(selectedItem && selectedItem.title) || title}
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
            item.title !== title && (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#dcd5d5" }),
                }}
                {...(item.isCategory && { "aria-disabled": true })}
              >
                <View style={styles.mainItem}>

                  <Text
                    style={{
                      ...styles.dropdownItemTxtStyle,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            )
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: moderateScale(10),
  },
  dropdownButtonStyle: {
    width: "100%",
    height: moderateScale(50),
    backgroundColor: "#E9ECEF",
    borderRadius: moderateScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(12),
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: moderateScale(18),
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonIconStyle: {
    fontSize: moderateScale(18),
    color: "#151E26",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: moderateScale(8),
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(8),
    backgroundColor: "white",
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: "500",
    color: "#151E26",
  },
  categoryItemStyle: {
    backgroundColor: "#f0f0f0",
  },
  categoryItemTxtStyle: {
    color: "#a0a0a0",
    fontStyle: "italic",
  },
  mainItemTouchable: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: moderateScale(5),
  },
  subItemTouchable: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20),
    paddingBottom: moderateScale(5),
    paddingTop: moderateScale(5),
  },
  mainItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    height: scale(24),
    width: scale(24),
    marginRight: moderateScale(15),
  },
  confirmBtn: {
    width: "100%",
    paddingVertical: verticalScale(5)
  }
});

export default CustomDropdown;
