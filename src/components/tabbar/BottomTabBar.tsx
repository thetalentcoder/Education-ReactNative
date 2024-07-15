import React from "react";
import { Pressable, View, Text, TouchableOpacity } from "react-native";
import { Foundation } from "@expo/vector-icons";

import styles from "./BottomTabBarStyle";
import { moderateScale } from "src/config/scale";

type Props = {
    state: any;
    descriptors: any;
    navigation: any;
}

export function BottomTabBar({
    state,
    descriptors, 
    navigation,
}: Props) {
    return (
        <>
        <View style={styles.container}>
            <View
                style={styles.innercontainer}
            >
                {
                    state.routes.map((route: any, index: any) => {
                        const { options } = descriptors[route.key];
                        const label = 
                            options.tarBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key
                            });

                            if (route.name != "Play") {
                                navigation.navigate(route.name);
                            }
                            else {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: "tabLongPress",
                                target: route.key
                            });
                        };

                        return (
                            <TouchableOpacity
                                key={index}
                                accessibilityRole="button"
                                accessibilityState={isFocused? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{
                                    flex: 1,
                                    height: moderateScale(98),
                                    alignItems: "center",
                                    paddingTop: moderateScale(16),
                                }}
                            >
                                <View
                                    style={isFocused ? styles.pressedEffect : styles.normalEffect }
                                    // style={styles.pressedEffect}
                                >
                                    <Foundation
                                        name={
                                            label.toLowerCase() == 'ranking' 
                                            ? 'graph-bar'
                                            : label.toLowerCase() == 'profile'
                                            ? 'torso'
                                            : label.toLowerCase()}
                                        size={isFocused ? moderateScale(30) : moderateScale(44)}
                                        color={isFocused ? "#FF675B" : "#CACACA"}
                                    />
                                    {
                                        isFocused 
                                        ? 
                                        <Text
                                            style={{
                                                color: "#FF675B",
                                                fontWeight: "500",
                                            }}
                                        >
                                            { label }
                                        </Text>
                                        : <></>
                                    }
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
        </>
    )
}
