import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Video, ResizeMode } from 'expo-av';

import SectionCategory from "src/sections/Category/SectionCategory";
import styles from "./CategoryStyle";
import SectionHeader from "src/sections/Common/SectionHeader";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import { LinearGradient } from "expo-linear-gradient";
import { gameModeString } from "src/constants/consts";
import { useFocusEffect } from "@react-navigation/native";
import { user_test_data } from "assets/@mockup/data";
import { useVideo } from "src/hooks/useVideo";


type Props = {
    route?: any,
    navigation?: any,
}

export default function Category({
    route,
    navigation,
}: Props) {
    const [gameMode, setGameMode] = useState(route.params && route.params["gameMode"] != undefined ? route.params["gameMode"] : 1);
    const player = React.useRef(null);
    const [status, setStatus] = useState({});
    
    const { thumbnailUrl, videoUrl, video } = useVideo();

    useFocusEffect(
        React.useCallback(() => {
            if (route.params && route.params["gameMode"] != undefined) {
                setGameMode(route.params["gameMode"]);
            }
        }, [route.params, setGameMode])
    );

    useEffect(() => {
        
    }, []);

    const gotoDashboard = useCallback(() => {
        navigation.navigate("Dashboard");
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient>
            <View style={styles.headerContainer}>
                <SectionHeaderX 
                    title={gameModeString[gameMode]}
                    goBack={gotoDashboard}
                />
            </View>
            <View style={styles.vimeoVideoContainer}>
                {
                    videoUrl && 
                    <Video
                        ref={player}
                        style={styles.video}
                        source={{
                        uri: videoUrl,
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                }
            </View>
            <View style={styles.sectionContentSlider}>
                <SectionCategory 
                    gameMode={gameMode} 
                    goBack={gotoDashboard} 
                />
            </View>
        </View>
    );
}