import React, { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
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
import { useSelector } from "react-redux";


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
    const { user } = useSelector((state: any) => state.userData);
    const [video_url, setvideo_url] = useState("");

    useFocusEffect(
        useCallback(() => {
            const fetchVideoData = async () => {
                if (route.params && route.params["gameMode"] !== undefined) {
                    setGameMode(route.params["gameMode"]);
                    const matchedVideo = user.videos.find(
                        (video: { title: string }) => video.title === gameModeString[route.params["gameMode"]]
                    );
        
                    if (matchedVideo) {
                        setvideo_url(matchedVideo.vimeoId);
                    } else {
                        setvideo_url('1033922649');
                    }
                }
            };    
            fetchVideoData();
        }, [route.params, setGameMode, user.videos, gameModeString])
    );
    const {thumbnailUrl, videoUrl, video} = useVideo(video_url);

    const gotoDashboard = useCallback(() => {
        navigation.navigate("Home", {
            screen: "Dashboard",
        });
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