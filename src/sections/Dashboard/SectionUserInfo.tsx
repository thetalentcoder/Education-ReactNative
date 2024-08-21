import React, { useCallback, useEffect, useState } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import { PTFEAvatar } from "src/components/avatar";
import styles from "./SectionUserInfoStyle";
import { useNavigation } from "@react-navigation/native";


import { formatNumberWithCommas } from "src/utils/util";
import { moderateScale } from "src/config/scale";
import { getMe } from "src/actions/user/user";
import { setUser } from "src/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
    streaks: number,
    score: number,
}

export default function SectionUserInfo({
    streaks = 0,
    score = 0,
}: Props) {
    const dispatch = useDispatch();
    const navigation: any = useNavigation();

    const { user } = useSelector((state) => state.userData);

    return (
        <View style={styles.container}>
            <PTFEAvatar
                greeting="Good to see you,"
                userName={user?.fullname}
                avatar={user?.avatarUrl}
            />
            <View style={styles.userInfoContainer}>
                <TouchableOpacity
                    onPress={async () => {
                        navigation.navigate("Streak");
                    }}
                    style={styles.flameButtonContainer}
                >
                    <View style={styles.flameIconButton}>
                        <FontAwesome5
                            name="fire-alt"
                            size={moderateScale(26)}
                            color="white"
                        />
                    </View>
                    <View style={styles.streakTextContainer}>
                        <Text style={styles.streakText}>
                            {` ${streaks}`}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.scoreContainer}>
                    <TouchableOpacity
                        onPress={async () => {
                            navigation.navigate("Points");
                        }}
                    >
                        <Text style={styles.scoreText}>
                            <FontAwesome5 name="trophy" size={moderateScale(14)} color="white" />
                            &nbsp;{formatNumberWithCommas(score)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}