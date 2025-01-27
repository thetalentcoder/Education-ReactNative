import React, { useCallback, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import SectionHeader from "src/sections/Common/SectionHeader";

import styles from "./WatchTutorialStyle";
import { logout } from "src/actions/auth/auth";
import { PTFEButton } from "src/components/button";
import { useSelector } from "react-redux";
import { PTFEEdit } from "src/components/edit";

import globalStyle from "src/theme/globalStyle";

import ToggleSwitch from 'toggle-switch-react-native';
import { useVideo } from "src/hooks/useVideo";
import { ResizeMode, Video } from "expo-av";


export default function WatchTutorial() {
    const navigation: any = useNavigation();
    const { user } = useSelector((state: any) => state.userData);

    const [video_url, setvideo_url] = useState("");
    
    useFocusEffect(
        useCallback(() => {
            const fetchVideoData = async () => {
                if (user.videos !== undefined) {
                    const matchedVideo = user.videos.find(
                        (video: { title: string, vimeoId: string }) => video.title === "Tutorial"
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

    const player = React.useRef(null);
    const [status, setStatus] = useState({});
    

    const goBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onSignOut = useCallback(async () => {
        await logout();
        navigation.navigate("Login");
    }, [navigation]);

    const NavigateTo = useCallback((path: string) => {
        navigation.navigate(path);
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
            <ScrollView style={styles.innerContainer}>
                <View style={styles.headerContainer}>
                    <SectionHeader 
                        title="Rewatch the Tutorial" 
                        goBack={goBack}
                    />
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.mainContainer}>
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
                        <View style={styles.buttonContainer}>
                            <PTFEButton
                                text="Go Back"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {
                                    navigation.goBack();
                                    // hideModal();
                                }}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.buttonContainer}>
                        <View style={styles.button1Wrap}>
                            <PTFEButton
                                text="Save"
                                type="rounded"
                                color="#FF675B"
                                onClick={() => {}}
                            />
                        </View>
                        <View style={styles.button2Wrap}>
                            <PTFEButton
                                text="Back"
                                type="rounded"
                                color="#87C6E8"
                                onClick={() => {setModalVisible(false)}}
                            />
                        </View>
                    </View> */}
                </View>
            </ScrollView>
        </View>
    )
}