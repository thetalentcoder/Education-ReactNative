import React, { useCallback, useState } from "react";
import { Alert, View } from "react-native";

import SectionCategory from "src/sections/SelectFlashcardTitle/SectionCategory";
import styles from "./SelectFlashcardTitleStyle";
import SectionHeader from "src/sections/Common/SectionHeader";
import { LinearGradient } from "expo-linear-gradient";
import { gameModeString } from "src/constants/consts";
import { useFocusEffect } from "@react-navigation/native";
import CustomKeyboardAvoidingView from "src/wrappers/CustomKeyboardAvoidingView";

import { useVideo } from "src/hooks/useVideo";
import { ResizeMode, Video } from "expo-av";
import { useSelector } from "react-redux";

type Props = {
    route?: any,
    navigation?: any,
}

export default function SelectFlashcardTitle({
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
                if (user.videos !== undefined) {
                    const matchedVideo = user.videos.find(
                        (video: { title: string, vimeoId: string }) => video.title === "FlashCard"
                    );
    
                    if (matchedVideo) {
                        setvideo_url(matchedVideo.vimeoId);
                    } else {
                        setvideo_url('1033922649');
                    }
                }
            };
    
            fetchVideoData();
        }, [user.videos])
    );
    const {thumbnailUrl, videoUrl, video} = useVideo(video_url);
    const gotoDashboard = () => {
        navigation.goBack()
    }

    return (
        <CustomKeyboardAvoidingView>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FF675B', '#87C6E8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.upperGradientContainer}
                >
                </LinearGradient>
                <View style={styles.headerContainer}>
                    <SectionHeader
                        title='New Flashcard Deck'
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
                    <SectionCategory />
                </View>
            </View>
        </CustomKeyboardAvoidingView>
    );
}