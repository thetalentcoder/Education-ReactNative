
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { store } from 'src/redux/store';
import { fontsToLoad } from 'src/constants/consts';
import { MainStackNavigator } from 'src/navigation/AppNavigator';
import NotificationHandler from './Notification';


import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fontsToLoad);


  StatusBar.setHidden(true);
  NavigationBar.setPositionAsync('absolute');
  NavigationBar.setBackgroundColorAsync('#ffffff00');
  NavigationBar.setBehaviorAsync('inset-swipe');
 

  if (fontsLoaded) {
    return (
        <Provider store={store}>
          <NavigationContainer>
            <NotificationHandler />
            <MainStackNavigator />
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


