
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { GameModeProvider } from './GameModeContext';
import '@react-native-firebase/app'; // Import Firebase App
import { store } from 'src/redux/store';
import { fontsToLoad } from 'src/constants/consts';
import { MainStackNavigator } from 'src/navigation/AppNavigator';
import Purchases from 'react-native-purchases';


import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fontsToLoad);

  useEffect(() => {
    Purchases.configure({
      apiKey: 'appl_zWmzPCmLrHPuQLIrRtiLxFQkdVi', // Replace with your actual API key
      appUserID: null, // Optional: Use null for anonymous users or pass a unique user ID
    });
  }, []);
  StatusBar.setHidden(false);
  NavigationBar.setPositionAsync('absolute');
  NavigationBar.setBackgroundColorAsync('#ffffff00');
  NavigationBar.setBehaviorAsync('inset-swipe');
 

  if (fontsLoaded) {
    return (
        <Provider store={store}>
          <NavigationContainer>
            <GameModeProvider>
              <MainStackNavigator />
            </GameModeProvider>
          </NavigationContainer>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


