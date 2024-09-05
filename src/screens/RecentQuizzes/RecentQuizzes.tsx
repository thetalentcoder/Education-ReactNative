import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from "./RecentQuizzesStyle";
import SectionHeader from 'src/sections/Common/SectionHeader';
import { LinearGradient } from 'expo-linear-gradient';
import SectionMainContent from 'src/sections/RecentQuizzes/SectionMainContent';
import { getMe } from 'src/actions/user/user';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/redux/userSlice';
import { PTFELoading } from 'src/components/loading';

type Props = {
    route?: any;
    navigation?: any;
}

export default function RecentQuizzes({ route, navigation }: Props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);

    useEffect(() => {
        refreshUserData();
    }, []);

    const refreshUserData = useCallback(async () => {
        setIsLoading(true);
        const userInfo = await getMe();
        setGameHistory(userInfo?.gamehistory);
        dispatch(setUser(userInfo));
        setIsLoading(false);
    }, [setIsLoading, dispatch]);

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: "100%"}}>
                <LinearGradient
                    colors={['#FF675B', '#87C6E8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.upperGradientContainer}
                >
                </LinearGradient>
                <View style={styles.headerContainer}>
                    <SectionHeader
                        title={'Recent Quizzes'}
                        goBack={goBack}
                    />
                </View>
                <View style={styles.sectionContentSlider}>
                    <SectionMainContent navigation={navigation} gamehistory={gameHistory}/>
                </View>
            </ScrollView>
            {/* { isLoading && <PTFELoading /> } */}
        </View>
    );
}

