import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { TopSection } from "src/sections/Ranking/TopSection";
import { BottomSection } from "src/sections/Ranking/BottomSection";

import styles from "./RankingStyle";
import globalStyle from "src/theme/globalStyle";
import { getRankingSeason, getTopRankingUsers } from "src/actions/user/user";
import { useFocusEffect } from "@react-navigation/native";
import { PTFELoading } from "src/components/loading";

export default function Ranking() {
    const currentDate = new Date();
    const currentSeason = Math.ceil(currentDate.getMonth() / 3);

    const [season, SetSeason] = useState(currentSeason);
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
    }, [season]);

    useEffect(() => {
        if (gameMode == "") {
            fetchTopRankingUsers()
        } else {
            fetchTopRankingUsersByGameMode()
        }
    }, [gameMode]);

    const fetchTopRankingUsers = async () => {
        try {
            setIsLoading(true);
            const result = await getRankingSeason(season);
            const resultWithUserIndex = result.seasonScores.map((user: any, index: number) => ({
                ranking: user.rank,
                fullname: user.seasonScore == 0 ? "-" : user.userName,
                score: user.seasonScore,
                index: index + 1,
                currentUser: false,
                rank: '',
                // currentUser: result.userScore.userId === user._id ? true : false,
                // rank: result.userScore.userId === user._id ? result.userScore.rank : '',
            }))
            setUserRankingData(resultWithUserIndex)

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
        finally {
        }

    }

    const fetchTopRankingUsersByGameMode = async () => {
        try {
            setIsLoading(true);

            const result = await getRankingSeason(season, gameMode);
            const resultWithUserIndex = result.seasonScores.map((user: any, index: number) => ({
                ranking: user.rank,
                fullname: user.seasonScore == 0 ? "-" : user.userName,
                score: user.seasonScore,
                index: index + 1,
                currentUser: false,
                rank: '',
                // currentUser: result.userScore.userId === user._id ? true : false,
                // rank: result.userScore.userId === user._id ? result.userScore.rank : '',
            }))
            setUserRankingData(resultWithUserIndex)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
        finally {
        }
    }

    return (
        <View style={styles.container}>
            {isLoading && <PTFELoading />}
            <ScrollView style={styles.innerContainer}>
                <View style={styles.topSection}>
                    <TopSection 
                        handleSelect={handleSelect} 
                        rankingData={userRankingData} 
                        currentSeason={currentSeason}
                        season={season}
                        setSeason={SetSeason}
                    />
                </View>
                <View style={styles.bottomSection}>
                    {
                        userRankingData.length > 3 &&
                        <BottomSection gameMode={gameMode} rankingData={userRankingData} />
                    }
                </View>
            </ScrollView>
        </View>
    );
}