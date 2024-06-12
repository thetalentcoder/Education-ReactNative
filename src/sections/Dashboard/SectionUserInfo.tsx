import React from "react";
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
                userName={user.fullname}
            />
            <View style={styles.userInfoContainer}>
                <Pressable onPress={async () => {
                        const userInfo = await getMe();
                        dispatch(setUser(userInfo));
                        navigation.navigate("Streak");
                    }}>
                    <Image style={styles.flameIcon} source={require("assets/images/chore/flame.png")} />
                </Pressable>
                <View style={styles.streakTextContainer}>
                    <Text style={styles.streakText}>
                        {streaks}
                    </Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>
                        <FontAwesome5 name="trophy" size={moderateScale(14)} color="white" />
                        &nbsp;{formatNumberWithCommas(score)}
                    </Text>
                </View>
            </View>
        </View>
    );
}