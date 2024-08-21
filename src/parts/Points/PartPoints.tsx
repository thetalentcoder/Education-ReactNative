import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";

import { getLastSeason, getMonthPoint, getTotalPoints } from "src/actions/points/points";

import styles from "./PartPointsStyle";
import { PTFELinkButton } from "src/components/button";

import ClassicModeIcon from "assets/icons/ClassicModeIcon";
import SurvivorModeIcon from "assets/icons/SurvivorModeIcon";
import ScenarioModeIcon from "assets/icons/ScenarioModeIcon";
import { PTFELoading } from "src/components/loading";
import SkeletonContent from "react-native-skeleton-content";

const data = [
    {
        title: "Classic",
        icon: "Classic",
        score: 2414,
    },
    {
        title: "Survivor",
        icon: "Survivor",
        score: 442,
    },
    {
        title: "Scenario",
        icon: "Scenario",
        score: 532,
    },
];

const menuItems = [
    {title: 'This Month'},
    {title: 'Previous Season'},
    {title: 'Total'},
  ];

type Props = {
    isLoading: boolean,
    setIsLoading: (newValue: boolean) => void;
}

export default function PartPoints({
    isLoading,
    setIsLoading,
}: Props) {
    const { user } = useSelector((state: any) => state.userData);

    const [selected, setSelected] = useState(0);

    const [studyMode, setStudyMode] = useState(0);
    const [classicMode, setClassicMode] = useState(0);
    const [scenarioMode, setScenarioMode] = useState(0);
    const [survivorMode, setSurvivorMode] = useState(0);

    const calculateTotalPoints = async () => {
        setIsLoading(true);

        setSelected(0);

        const response = await getTotalPoints();
        setStudyMode(response["studyMode"]);
        setClassicMode(response["classicMode"]);
        setSurvivorMode(response["survivorMode"]);
        setScenarioMode(response["scenarioMode"]);

        setIsLoading(false);
    }

    const calculateMonthPoint = async () => {
        setIsLoading(true);

        setSelected(1);

        const response = await getMonthPoint();
        setStudyMode(response["studyMode"]);
        setClassicMode(response["classicMode"]);
        setSurvivorMode(response["survivorMode"]);
        setScenarioMode(response["scenarioMode"]);

        setIsLoading(false);
    }

    const calculateLastSeasonPoint = async () => {
        setIsLoading(true);

        setSelected(2);

        const response = await getLastSeason();
        setStudyMode(response["studyMode"]);
        setClassicMode(response["classicMode"]);
        setSurvivorMode(response["survivorMode"]);
        setScenarioMode(response["scenarioMode"]);

        setIsLoading(false);
    }

    useEffect(() => {
        calculateTotalPoints()
            .then(() => {
                console.log("Success Total Points");
            }).catch(() => {
                console.log("Error Occured Getting Total");
            }).finally(() => {
                console.log("");
            });
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>
                    Total Points
                </Text>
                <View style={styles.buttonContainer}>
                    <PTFELinkButton
                        text="Total"
                        color="#87C6E8"
                        underlined={selected == 0}
                        disabled={selected == 0}
                        onClick={() => { calculateTotalPoints(); }}
                    />
                    <Text>{` | `}</Text>
                    <PTFELinkButton
                        text="This Month"
                        color="#87C6E8"
                        underlined={selected == 1}
                        disabled={selected == 1}
                        onClick={() => { calculateMonthPoint(); }}
                    />
                    <Text>{` | `}</Text>
                    <PTFELinkButton
                        text="Previous Season"
                        color="#87C6E8"
                        underlined={selected == 2}
                        disabled={selected == 2}
                        onClick={() => { calculateLastSeasonPoint(); }}
                    />
                </View>
            </View>
            {/* <SkeletonContent
                containerStyle={{flex: 1, width: 300}}
                isLoading={isLoading}
            > */}
            {
                data.map((col, index) => {
                    let color = ''
                    switch (col.title) {
                        case "Classic Mode":
                            color = "#FF675B";
                            // color = "#8270F6";
                            break;
                        case "Survivor Mode":
                            color = "#FF675B";
                            // color = "#FFD967";
                            break;
                        case "Scenario Mode":
                            color = "#FF675B";
                            // color = "#FF6DAA";
                            break;
                        default:
                            color = "#FF675B";
                    }
                    return (
                        <View
                            key={index}
                            style={styles.oneQuiz}
                        >
                            <View style={[styles.icon, { backgroundColor: color }]}>
                                {
                                    col.icon == "Classic" ? <ClassicModeIcon /> :
                                    col.icon == "Survivor" ? <SurvivorModeIcon /> :
                                    col.icon == "Scenario" ? <ScenarioModeIcon /> : <></>
                                }
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.titleText}>
                                    {col.title}
                                </Text>
                            </View>
                            <View style={[styles.percentContainer]}>
                                <Text
                                    style={[styles.percentText, { color: "#222222" }]} >
                                    {
                                        col.icon == "Classic" ? classicMode :
                                        col.icon == "Survivor" ? survivorMode :
                                        col.icon == "Scenario" ? scenarioMode : <></>
                                    }
                                </Text>
                            </View>
                        </View>
                    )
                })
            }
            {/* </SkeletonContent> */}
        </View>
    )
}