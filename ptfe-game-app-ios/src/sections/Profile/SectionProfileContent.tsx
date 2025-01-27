import React from "react";
import { View, Image, Pressable } from "react-native";

import PartUserInfo from "src/parts/Profile/PartUserInfo";
import PartRecentQuizzes from "src/parts/Profile/PartRecentQuizzes";

import styles from "./SectionProfileContentStyle";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

type Props = {
    fullname?: string,
    score?: number,
    currentSeasonPoints: any,
    currentSeasonRank: any
}

export default function SectionProfileContent({
    fullname,
    score,
    currentSeasonPoints,
    currentSeasonRank
}: Props) {
    const navigation: any = useNavigation()
    const { user } = useSelector((state: any) => state.userData);
    const imageSource = user?.avatarUrl ? { uri: user?.avatarUrl } : { uri: "" };
    const convertImageUrl = (url: string) => {
        return url.replace(
          "https://storage.cloud.google.com",
          "https://storage.googleapis.com"
        );
      };
    const onAvatarPress = () => {
        navigation.navigate("AvatarUpload");
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={onAvatarPress}>
                <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={
                        user?.avatarUrl
                        ? { uri: convertImageUrl(user?.avatarUrl) }
                        : 
                        require("assets/images/imgs/profileDefault.png")
                    }
                    />
                </View>
            </Pressable>
            <View style={styles.userInfoContainer}>
                <PartUserInfo
                    fullname={fullname}
                    score={score}
                    currentSeasonPoints={currentSeasonPoints}
                    currentSeasonRank={currentSeasonRank}
                />
            </View>
            <View style={styles.recentQuizContainer}>
                <PartRecentQuizzes />
            </View>
        </View>
    )
}