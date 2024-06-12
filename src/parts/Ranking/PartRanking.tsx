import React from "react";
import { View, Text } from "react-native";

import styles from "./PartRankingStyle";

type Props = {
    ranking: number;
    name: string;
    score: number;
}

export default function PartRanking({
    ranking,
    name,
    score,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.numberContainer}>
                <Text style={styles.rankingText}>
                    {ranking}
                </Text>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>
                    {name}
                </Text>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                    {score}
                </Text>
            </View>
        </View>
    )
}