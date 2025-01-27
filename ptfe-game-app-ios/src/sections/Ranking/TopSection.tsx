import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import _ from 'lodash';

import PartAvatar from "src/parts/Ranking/PartAvatar";

import styles from "./TopSectionStyle";

import { data_ranking1 } from "assets/@mockup/data";
import { data_ranking2 } from "assets/@mockup/data";
import { data_ranking3 } from "assets/@mockup/data";
import { data_ranking4 } from "assets/@mockup/data";

import Cylinder from "src/parts/Ranking/Cylinder";
import CustomDropdown from "src/parts/Ranking/CustomDropDown";
import { moderateScale, scale } from "src/config/scale";
import globalStyle from "src/theme/globalStyle";
import { PTFEButton } from "src/components/button";

type Props = {
    handleSelect: (value: any) => void,
    rankingData: {
        id: string
        index: number
        fullname: string
        score: number
        url: string
    }[],
    currentSeason: number;
    season: number;
    setSeason: (value: number) => void;
}

export function TopSection({
    handleSelect,
    rankingData,
    currentSeason,
    season,
    setSeason,
}: Props) {
    const [data_ranking, setDataRanking] = useState<any[]>(data_ranking1);

    const options = [
        { title: 'Total', value: "" },
        { title: 'Classic Mode', value: 'classicMode' },
        { title: 'Survivor Mode', value: 'survivorMode' },
        { title: 'Scenario Mode', value: 'scenarioMode' },
    ];

    const [displaySeason, setDisplaySeason] = useState(1);
    const getDisplaySeason = () => {
        const startDate = new Date('2024-10-01'); // November 1, 2024
        const currentDate = new Date();
        
        // Calculate the month difference
        const monthDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
        
        // Calculate the current season
        const seasonIndex = Math.floor(monthDiff / 3);
        const season = seasonIndex + 1; // Seasons start from 1
    
        return {
            season,
            currentSeason: seasonIndex === 0 ? season : Math.max(season, 1), // Ensuring at least Season 1 is returned
        };
    };
    useEffect(() => {
        const { season } = getDisplaySeason();
        setDisplaySeason(season); // Set the display season when the component mounts
    }, []);

    useEffect(() => {
        console.log("Data chnaged");
    }, [data_ranking]);

    const onSelect = (item: any) => {
        handleSelect(item.value);
    };

    const prevSeason = () => {
        if (season >= 2) {
            setSeason(season - 1);
            setDisplaySeason(displaySeason - 1);
        }
    }

    const nextSeason = () => {
        if (season < currentSeason) {
            setSeason(season + 1);
            setDisplaySeason(displaySeason + 1);
        }
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.seasonContainer}>
                    <View style={displaySeason != 1?styles.previousbutton: styles.button}>
                        {
                            displaySeason != 1
                            ? <PTFEButton 
                                text="Previous"
                                type="circle"
                                color="#FF675B"
                                onClick={prevSeason}
                                height={scale(36)}
                            />
                            : <View style={{ width: scale(110) }} /> 
                        }
                    </View>
                    <View style={styles.seasonTitle}>
                        <Text style={styles.seasonText}>Season {displaySeason} </Text>
                        {/* {
                            season == currentSeason 
                            ? <Text style={styles.currentSeasonText}>&nbsp;&nbsp;(Current)</Text>
                            : <></>
                        } */}
                    </View>
                    {
                        season == currentSeason
                        ? <View style={{ width: scale(110) }} /> 
                        : <View style={styles.button}>
                            <PTFEButton 
                                text="Next"
                                type="circle"
                                color="#FF675B"
                                onClick={nextSeason}
                                height={scale(36)}
                            />
                        </View>
                    }
                </View>
                <View style={styles.lineContainer} />
                <View style={styles.dropDownContainer}>
                    <CustomDropdown options={options} onSelect={onSelect} title="Total " page="ranking" />
                </View>
                {
                    rankingData.length >= 3 ?
                        <View style={styles.innerContainer}>
                            {
                                rankingData[1] &&
                                <View style={styles.smallContainer}>
                                    <PartAvatar
                                        ranking={rankingData[1]?.index}
                                        name={rankingData[1]?.fullname}
                                        score={rankingData[1]?.score}
                                        imagePath={rankingData[1]?.url}
                                    />
                                    <Cylinder
                                        topColor="#FF6DAA"
                                        ranking={2}
                                        height={moderateScale(180)}
                                    />
                                </View>
                            }
                            {
                                rankingData[0] &&
                                <View style={styles.smallContainer}>
                                    <PartAvatar
                                        ranking={rankingData[0]?.index}
                                        name={rankingData[0]?.fullname}
                                        score={rankingData[0]?.score}
                                        imagePath={rankingData[0]?.url}
                                    />
                                    <Cylinder
                                        topColor="#6852F2"
                                        ranking={1}
                                        height={moderateScale(200)}
                                    />
                                </View>
                            }
                            {
                                rankingData[2] &&
                                <View style={styles.smallContainer}>
                                    <PartAvatar
                                        ranking={rankingData[2]?.index}
                                        name={rankingData[2]?.fullname}
                                        score={rankingData[2]?.score}
                                        imagePath={rankingData[2]?.url}
                                    />
                                    <Cylinder
                                        topColor="#FFD967"
                                        ranking={3}
                                        height={moderateScale(150)}
                                    />
                                </View>
                            }
                        </View> :
                        <View style={globalStyle.margin16}></View>
                }
            </View>
        </>
    )
}