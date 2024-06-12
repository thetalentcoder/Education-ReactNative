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

type Props = {
    handleSelect: (value: any) => void,
}

export function TopSection({
    handleSelect,
}: Props) {
    const [data_ranking, setDataRanking] = useState<any []>(data_ranking1);

    const options = [
        { title: 'Study Mode', value: '1' },
        { title: 'Quiz Mode', value: '2' },
        { title: 'Survivor Mode', value: '3' },
        { title: 'Scenario Mode', value: '4' },
    ];

    useEffect(() => {
        console.log("Data chnaged");
    }, [data_ranking]);
    
    const onSelect = (item: any) => {
        handleSelect(item.value);
        switch(item.value) {
            case "1":
                {
                    console.log(item.value);
                    const newStateClone = _.cloneDeep(data_ranking);
                    Object.assign(newStateClone, data_ranking1);
                    setDataRanking(newStateClone);
                }
                break;
            case "2":
                {
                    const newStateClone = _.cloneDeep(data_ranking);
                    Object.assign(newStateClone, data_ranking2);
                    setDataRanking(newStateClone);
                }
                break;
            case "3":
                {
                    const newStateClone = _.cloneDeep(data_ranking);
                    Object.assign(newStateClone, data_ranking3);
                    setDataRanking(newStateClone);
                }
                break;
            case "4": 
                {
                    const newStateClone = _.cloneDeep(data_ranking);
                    Object.assign(newStateClone, data_ranking4);
                    setDataRanking(newStateClone);
                }
                break;
        }
        // handleSelect(item.value);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.dropDownContainer}>
                    <CustomDropdown options={options} onSelect={onSelect} title="Game Mode"/>
                </View>
                <View style={styles.innerContainer}>
                    <View style={styles.smallContainer}>
                        <PartAvatar 
                            ranking={data_ranking[1].index}
                            name={data_ranking[1].name}
                            score={data_ranking[1].score}
                        />
                        <Cylinder 
                            topColor="#FF6DAA"
                            ranking={2}
                            height={moderateScale(180)}
                        />
                    </View>
                    <View style={styles.smallContainer}>
                        <PartAvatar 
                            ranking={data_ranking[0].index}
                            name={data_ranking[0].name}
                            score={data_ranking[0].score}
                        />
                        <Cylinder 
                            topColor="#6852F2"
                            ranking={1}
                            height={moderateScale(200)}
                        />
                    </View>
                    <View style={styles.smallContainer}>
                        <PartAvatar 
                            ranking={data_ranking[2].index}
                            name={data_ranking[2].name}
                            score={data_ranking[2].score}
                        />
                        <Cylinder 
                            topColor="#FFD967"
                            ranking={3}
                            height={moderateScale(150)}
                        />
                    </View>
                </View>
            </View>
        </>
    )
}