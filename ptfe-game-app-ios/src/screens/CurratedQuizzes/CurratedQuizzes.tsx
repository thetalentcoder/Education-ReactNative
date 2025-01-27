import React from 'react';
import { View } from 'react-native';
import styles from "./CurratedQuizzesStyle"
import SectionHeader from 'src/sections/Common/SectionHeader';
import { LinearGradient } from 'expo-linear-gradient';
import SectionMainContent from 'src/sections/CurratedQuizzes/SectionMainContent';

type Props = {
    route?: any;
    navigation?: any;
}

export default function CurratedQuizzes({ route, navigation }: Props) {

    const goBack = () => {
        navigation.goBack()
    }

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
                <SectionHeader
                    title={'Currated Quizzes'}
                    goBack={goBack}
                />
            </View>
            <View style={styles.sectionContentSlider}>
                <SectionMainContent navigation={navigation} />
            </View>
        </View>
    );
}

