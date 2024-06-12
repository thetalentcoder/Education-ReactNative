import * as Font from 'expo-font';

const useFonts = async () => {
    await Font.loadAsync({
        CircularStdBlack: require('../assets/fonts/CircularStd-Black.ttf'),
    });
}

export default useFonts;