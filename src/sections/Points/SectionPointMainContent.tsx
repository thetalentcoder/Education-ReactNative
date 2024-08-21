import React from "react";
import { View } from "react-native";
import PartPointProgress from "src/parts/Points/PartPointProgress";
import PartPoints from "src/parts/Points/PartPoints";

import styles from "./SectionPointMainContentStyle";

type Props = {
    isLoading: boolean,
    setIsLoading: (newValue: boolean) => void;
}

export default function SectionPointMainContent({
    isLoading,
    setIsLoading
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <PartPointProgress 
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </View>
            <View style={styles.RecentPointContainer}>
                <PartPoints 
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </View>
        </View>
    )
}