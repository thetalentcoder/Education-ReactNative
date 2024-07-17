import React, { useEffect, useState } from "react";
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
import { moderateScale } from "src/config/scale";
import globalStyle from "src/theme/globalStyle";

type Props = {
    handleSelect: (value: any) => void,
    rankingData: {
        id: string
        index: number
        fullname: string
        score: number
    }[]
}

export function TopSection({
    handleSelect,
    rankingData
}: Props) {
    const [data_ranking, setDataRanking] = useState<any[]>(data_ranking1);

    const options = [
        { title: 'Total', value: "" },
        { title: 'Study Mode', value: 'studyMode' },
        { title: 'Classic Mode', value: 'quizMode' },
        { title: 'Survivor Mode', value: 'survivorMode' },
        { title: 'Scenario Mode', value: 'scenarioMode' },
    ];

    useEffect(() => {
        console.log("Data chnaged");
    }, [data_ranking]);

    const onSelect = (item: any) => {
        handleSelect(item.value);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.dropDownContainer}>
                    <CustomDropdown options={options} onSelect={onSelect} title="Total" page="ranking" />
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