import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { TopSection } from "src/sections/Ranking/TopSection";
import { BottomSection } from "src/sections/Ranking/BottomSection";

import styles from "./RankingStyle";
import globalStyle from "src/theme/globalStyle";
import { getTopRankingUsers } from "src/actions/user/user";
import { useFocusEffect } from "@react-navigation/native";
import { PTFELoading } from "src/components/loading";

export default function Ranking() {
    const [gameMode, SetGameMode] = useState("");
    const [userRankingData, setUserRankingData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true)
    const handleSelect = (value: string) => {
        SetGameMode(value);
    }

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true)
            fetchTopRankingUsers()
            setIsLoading(false)
        }, [])
    );

    // useEffect(() => {
    //     fetchTopRankingUsers()
    // }, [])

    useEffect(() => {
        if (gameMode == "") {
            fetchTopRankingUsers()
        } else {
            fetchTopRankingUsersByGameMode()
        }
    }, [gameMode])

    const fetchTopRankingUsers = async () => {
        try {
            const result = await getTopRankingUsers()
            const resultWithUserIndex = result.users.map((user: any, index: number) => ({
                ...user,
                index: index + 1,
                currentUser: result.currentUser._id === user._id ? true : false,
                rank: result.currentUser._id === user._id ? result.rank : '',
            }))
            setUserRankingData(resultWithUserIndex)
        } catch (error) {
            console.log(error)
        }
        finally {
        }

    }

    const fetchTopRankingUsersByGameMode = async () => {
        try {
            const result = await getTopRankingUsers(gameMode)
            const resultWithUserIndex = result.users.map((user: any, index: number) => ({
                ...user,
                index: index + 1,
                score: user.score_details[gameMode],
                currentUser: result.currentUser._id === user._id ? true : false,
                rank: result.currentUser._id === user._id ? result.rank : '',
            }))
            setUserRankingData(resultWithUserIndex)
        } catch (error) {
            console.log(error)
        }
        finally {
        }
    }

    return (
        <View style={styles.container}>
            {isLoading ?
                <PTFELoading />
                :
                (<ScrollView style={styles.innerContainer}>
                    <View style={styles.topSection}>
                        <TopSection handleSelect={handleSelect} rankingData={userRankingData} />
                    </View>
                    <View style={styles.bottomSection}>
                        {
                            userRankingData.length > 3 &&
                            <BottomSection gameMode={gameMode} rankingData={userRankingData} />
                        }
                    </View>
                </ScrollView>
                )
            }
        </View>
    );
}