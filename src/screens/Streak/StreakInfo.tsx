import React, { useCallback, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useVideo } from "src/hooks/useVideo";
import { LinearGradient } from "expo-linear-gradient";
import { ResizeMode, Video } from "expo-av";
import { scale, verticalScale } from "src/config/scale";
import SectionHeader from "src/sections/Common/SectionHeader";
import styles from "./StreakInfoStyle";

import texts from "src/config/texts";
import { PTFEButton } from "src/components/button";

type Props = {
    route?: any;
    navigation?: any;
}

export default function StreakInfo({
    route,
    navigation,
}: Props) {
    const { thumbnailUrl, videoUrl, video } = useVideo();
    const { title, content } = route.params;

    const player = React.useRef(null);
    const [status, setStatus] = useState({});

    const goBack = useCallback(() => {
        navigation.navigate('Streak');
    }, [navigation]);

    return (
        <View style={styles.modalContainer}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <SectionHeader title={""} goBack={goBack} />
                </View>
                <View style={styles.innerContainer}>
                    {
                        videoUrl &&
                        <View style={styles.vimeoVideoContainer}>
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
                        </View>
                    }
                    <View style={[styles.mainContent, { marginTop: videoUrl ? scale(32) : verticalScale(482) }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{`${title}`}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.content}>
                                {content}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PTFEButton
                                text="CONTINUE"
                                type="rounded"
                                color="#FF675B"
                                onClick={goBack}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}