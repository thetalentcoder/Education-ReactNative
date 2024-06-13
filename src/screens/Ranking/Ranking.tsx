import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { TopSection } from "src/sections/Ranking/TopSection";
import { BottomSection } from "src/sections/Ranking/BottomSection";

import styles from "./RankingStyle";
import { getTopRankingUsers } from "src/actions/user/user";
import Loading from "src/components/loading/ptfe-loading";

export default function Ranking() {
    const [gameMode, SetGameMode] = useState("");
    const [userRankingData, setUserRankingData] = useState<any>([]);
    const handleSelect = (value: string) => {
        SetGameMode(value);
    }

    useEffect(() => {
        fetchTopRankingUsers()
    }, [])

    useEffect(() => {
        fetchTopRankingUsersByGameMode()
    }, [gameMode])

    const fetchTopRankingUsers = async () => {
        const result = await getTopRankingUsers()
        const resultWithUserIndex = result.users.map((user: any, index: number) => ({
            ...user,
            index: index + 1,
        }))
        setUserRankingData(resultWithUserIndex)
    }

    const fetchTopRankingUsersByGameMode = async () => {
        const result = await getTopRankingUsers(gameMode)
        const resultWithUserIndex = result.users.map((user: any, index: number) => ({
            ...user,
            index: index + 1,
            score: user.score_details[gameMode]
        }))
        console.log(resultWithUserIndex)
        setUserRankingData(resultWithUserIndex)
    }

    return (
        <View style={styles.container}>
            {userRankingData.length == 0 ?
                <Loading />
                :
                (<ScrollView style={styles.innerContainer}>
                    <View style={styles.topSection}>
                        <TopSection handleSelect={handleSelect} rankingData={userRankingData} />
                    </View>
                    <View style={styles.bottomSection}>
                        <BottomSection gameMode={gameMode} rankingData={userRankingData} />
                    </View>
                </ScrollView>
                )
            }
        </View>
    );
}