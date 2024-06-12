import React from "react";
import { View } from "react-native";

import PartUserInfo from "src/parts/Profile/PartUserInfo";
import PartPointProgress from "src/parts/Profile/PartPointProgress";
import PartRecentQuizzes from "src/parts/Profile/PartRecentQuizzes";

import styles from "./SectionProfileContentStyle";

type Props = {
    fullname?: string,
    score?: string,
}

export default function SectionProfileContent({
    fullname,
    score,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
            </View>
            <View style={styles.userInfoContainer}>
                <PartUserInfo 
                    fullname={fullname}
                    score={score}
                />
            </View>
            <View style={styles.progressContainer}>
                <PartPointProgress />
            </View>
            <View style={styles.recentQuizContainer}>
                <PartRecentQuizzes />
            </View>
        </View>
    )
}