import React from "react";
import { View, Image, Pressable } from "react-native";

import PartUserInfo from "src/parts/Profile/PartUserInfo";
import PartRecentQuizzes from "src/parts/Profile/PartRecentQuizzes";

import styles from "./SectionProfileContentStyle";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

type Props = {
    fullname?: string,
    score?: string,
}

export default function SectionProfileContent({
    fullname,
    score,
}: Props) {
    const navigation: any = useNavigation()
    const { user } = useSelector((state) => state.userData);
    const imageSource = user?.avatarUrl ? { uri: user?.avatarUrl } : { uri: "" };

    const onAvatarPress = () => {
        navigation.navigate("AvatarUpload");
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={onAvatarPress}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={imageSource} />
                </View>
            </Pressable>
            <View style={styles.userInfoContainer}>
                <PartUserInfo
                    fullname={fullname}
                    score={score}
                />
            </View>
            <View style={styles.recentQuizContainer}>
                <PartRecentQuizzes />
            </View>
        </View>
    )
}