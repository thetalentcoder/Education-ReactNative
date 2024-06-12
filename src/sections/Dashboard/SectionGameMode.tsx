import React from "react";
import { View, Text } from "react-native";

import PartGameMode from "src/parts/Dashboard/PartGameMode";
import texts from "src/config/texts";
import styles from "./SectionGameModeStyle";

import { data_dashboard_game_modes } from "assets/@mockup/data";

type Props = {
}

export default function SectionGameMode({
}: Props) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                {texts.txt_screen_dashboard_title1}
            </Text>
            {
                data_dashboard_game_modes.map((item, index: number) => {
                    return (
                        <PartGameMode 
                            key={index}
                            index={index}
                            icon={item.icon}
                            title={item.title}
                            statusText={item.statusText}
                            buttonText={item.buttonText}
                        />
                    )
                })
            }
        </View>
    );
}