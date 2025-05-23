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
  const dropDownRef = useRef<SelectDropdown | null>(null);

  useEffect(() => {
    setDropDownList([{ title: 'All Categories', value: 'all', isCategory: true, isSelected: true }, ...options]);

    let selectedSubCategories;
    selectedSubCategories = getSelectedSubcategories();
    onSelect(selectedSubCategories);
  }, [options]);

  useEffect(() => {
    let selectedSubCategories;
    selectedSubCategories = getSelectedSubcategories();
    onSelect(selectedSubCategories);
  }, [dropDownList]);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    if (onSelect) {
      const selectedOption = options.find(
        (option: any) => option.value === value.value
      );
      onSelect(selectedOption);
    }
  };

  const handleCheckboxToggle = (index: number) => {
    const updatedList = [...dropDownList];
    const item = updatedList[index];
    item.isSelected = !item.isSelected;

    if (item.value === 'all') {
      updatedList.forEach((item) => {
        item.isSelected = updatedList[0].isSelected
        item.subCategories?.forEach((subItem: any) => {
          subItem.isSelected = updatedList[0].isSelected;
        })
      });

      if (item.isSelected == false) {
        let selectedItems = 0;
        updatedList.forEach((item) => {
          if (item.subCategories) {
            item.subCategories?.forEach((subItem: any) => {
              if (subItem.isSelected)
                selectedItems ++;
            })
          }
        })
      }
    } else {
      if (item.subCategories) {
        item.subCategories = item.subCategories.map((sub: any) => ({
          ...sub,
          isSelected: item.isSelected,
        }));

        let selectedItems = 0;
        updatedList.forEach((item) => {
          if (item.subCategories) {
            item.subCategories.forEach((subItem: any) => {
              if (subItem.isSelected)
                selectedItems++;
            })
          }
        })
      }
    }

    setDropDownList(updatedList);
  };

  const handleSubcategoryToggle = (mainIndex: number, subIndex: number) => {
    const updatedList = [...dropDownList];

    const mainItem = updatedList[mainIndex];
    const subItem = mainItem.subCategories[subIndex];
    subItem.isSelected = !subItem.isSelected;

    let selectedItems = 0;
    updatedList.forEach((item) => {
      if (item.subCategories) {
        item.subCategories.forEach((subItem: any) => {
          if (subItem.isSelected)
            selectedItems++;
        })
      }
    })

    setDropDownList(updatedList);
  };

  const getSelectedSubcategories = () => {
    const selectedSubcategories = dropDownList.flatMap((item: { subCategories: any[] }) =>
      item.subCategories
        ? item.subCategories
          .filter((sub) => sub.isSelected)
          .map((sub) => sub.title)
        : []
    );
    return selectedSubcategories;
  };

  const getAllSubCategoriesCount = () => {
    const categoryList = [...dropDownList];

    let itemCount = 0;
    categoryList.forEach((item) => {
      if (item.subCategories) {
        item.subCategories.forEach((subItem: any) => {
            itemCount++;
        })
      }
    })

    return itemCount;
  }

  const getSelectedCount = () => {
    const selectedSubcategories = getSelectedSubcategories();
    const subCategoriesCount = getAllSubCategoriesCount();
    if (selectedSubcategories.length === 0) {
      return title;
    } else if (selectedSubcategories.length === subCategoriesCount) {
      return "All Categories Selected";
    } else if (selectedSubcategories.length === 1) {
      return "1 Category Selected";
    } else {
      return `${selectedSubcategories.length} Categories Selected`;
    }
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        ref={dropDownRef}
        data={dropDownList}
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
                {getSelectedCount()}
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
                  ...(isSelected && { backgroundColor: "#888888" }),
                  ...(item.isCategory && styles.categoryItemStyle),
                }}
                {...(item.isCategory && { "aria-disabled": true })}
              >
                <TouchableOpacity
                  style={styles.mainItemTouchable}
                  onPress={() => handleCheckboxToggle(index)}
                >
                  <View style={styles.mainItem}>
                    {page == "category" && (
                      <Checkbox
                        value={item.isSelected}
                        onValueChange={() => handleCheckboxToggle(index)}
                        style={styles.checkbox}
                        color={"#FF675B"}
                      />
                    )}
                    <Text
                      style={{
                        ...styles.dropdownItemTxtStyle,
                        ...(item.isCategory && styles.categoryItemTxtStyle),
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
                {item.subCategories &&
                  item.subCategories.map((sub: any, subIndex: number) => (
                    <TouchableOpacity
                      style={styles.subItemTouchable}
                      onPress={() => handleSubcategoryToggle(index, subIndex)}
                      key={sub.value}
                    >
                      <View style={styles.subItem}>
                        <Checkbox
                          value={sub.isSelected}
                          onValueChange={() =>
                            handleSubcategoryToggle(index, subIndex)
                          }
                          style={styles.checkbox}
                          color={"#FF675B"}
                        />
                        <Text style={styles.dropdownItemTxtStyle}>
                          {sub.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                {
                  dropDownList.length - 1 === index &&
                  <View style={styles.confirmBtn}>
                    <PTFEButton
                      text="CONFIRM"
                      type="rounded"
                      color="#FF675B"
                      onClick={() => {
                        if (dropDownRef.current) {
                          dropDownRef.current.closeDropdown();
                        }
                      }}
                    />
                  </View>
                }

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
    height: moderateScale(250),
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
