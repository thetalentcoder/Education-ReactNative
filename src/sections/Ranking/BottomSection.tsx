import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import _ from 'lodash';

import { data_ranking1 } from "assets/@mockup/data";
import { data_ranking2 } from "assets/@mockup/data";
import { data_ranking3 } from "assets/@mockup/data";
import { data_ranking4 } from "assets/@mockup/data";

import PartRanking from "src/parts/Ranking/PartRanking";

import styles from "./BottomSectionStyle";

type Props = {
    gameMode: string,
    rankingData: {
        id: string
        index: number
        fullname: string
        score: number
    }[]
}

export function BottomSection({
    gameMode,
    rankingData
}: Props) {
    const [data_ranking, setDataRanking] = useState(data_ranking1);

    useEffect(() => {
        switch (gameMode) {
            case "1":
                {
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
    }, [gameMode]);

    return (
        <View style={styles.container}>
            {/* <ScrollView style={styles.innerContainer}> */}
            {
                rankingData.map((ranking, index) => {
                    if (index < 3) {
                        return (
                            <Fragment
                                key={index}
                            >
                            </Fragment>
                        );
                    }
                    else {
                        return (
                            <PartRanking
                                key={index}
                                ranking={ranking.index}
                                name={ranking.fullname}
                                score={ranking.score}
                            />
                        );
                    }
                })
            }
            {/* </ScrollView> */}
        </View>
    )
}