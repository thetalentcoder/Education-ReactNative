import React, { useEffect, useState } from 'react';
import { setUser } from 'src/redux/userSlice'; // Update with the correct path
import { getMe } from 'src/actions/user/user'; 
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabBar } from 'src/components/tabbar/BottomTabBar';

import Welcome from 'src/screens/Home/Home';
import Login from 'src/screens/Auth/Login';
import Register from 'src/screens/Auth/Register';
import ForgotPassword from 'src/screens/Auth/ForgotPassword';
import EmailVerify from 'src/screens/Auth/EmailVerify';
import Dashboard from 'src/screens/Dashboard/Dashboard';
import Study from 'src/screens/Study/Study';
import Explain from 'src/screens/Explain/Explain';
import Question from 'src/screens/Question/Question';
import Survival from 'src/screens/Survival/Survival';
import Score from 'src/screens/Score/Score';
import ReviewQAs from 'src/screens/ReviewQAs/ReviewQAs';
import Ranking from 'src/screens/Ranking/Ranking';

import Profile from 'src/screens/Profile/Profile';
import SettingScreen from 'src/screens/Settings/SettingScreen';
import AccountSettings from 'src/screens/Settings/AccountSettings/AccountSettings';
import Notifications from 'src/screens/Settings/Notifications/Notifications';
import ReportProblem from 'src/screens/Settings/ReportProblem/ReportProblem';
import WatchTutorial from 'src/screens/Settings/WatchTutorial/WatchTutorial';
import PrivacyPolicy from 'src/screens/Settings/PrivacyPolicy/PrivacyPolicy';
import RecentQuizzes from 'src/screens/RecentQuizzes/RecentQuizzes';

import Streak from 'src/screens/Streak/Streak';
import Points from 'src/screens/Points/Points';
import StreakInfo from 'src/screens/Streak/StreakInfo';
import Classic from 'src/screens/Classic/Classic';
import Scenario from 'src/screens/Scenario/Scenario';
import Category from 'src/screens/Category/Category';
import Flashcards from 'src/screens/Flashcards/Flashcards';
import CreateFlashcard from 'src/screens/CreateFlashcard/CreateFlashcard';
import SelectFlashcardTitle from 'src/screens/SelectFlashcardTitle/SelectFlashcardTitle';
import AvatarUpload from 'src/screens/AvatarUpload/AvatarUpload';
import CurratedQuizzes from 'src/screens/CurratedQuizzes/CurratedQuizzes';
import CurrentStreak from 'src/screens/CurrentStreak/CurrentStreak';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, View, StyleSheet, Image } from 'react-native';

const leftToRightAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const PlayStack = createStackNavigator();
const PlayStackNavigator = () => {
  return (
    <PlayStack.Navigator initialRouteName="Category" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Category" component={Category} />
      <PlayStack.Screen name="Study" component={Study} />
      <PlayStack.Screen name="Explain" component={Explain} />
      <PlayStack.Screen name="Question" component={Question} />
      <PlayStack.Screen name="Classic" component={Classic} />
      <PlayStack.Screen name="Scenario" component={Scenario} />
      <PlayStack.Screen name="Survival" component={Survival} />
      <PlayStack.Screen name="Flashcards" component={Flashcards} />
      <PlayStack.Screen name="Score" component={Score} />
      <PlayStack.Screen name="CurrentStreak" component={CurrentStreak} />
      <PlayStack.Screen name='ReviewQA' component={ReviewQAs} />
    </PlayStack.Navigator>
  )
}

const RankingStack = createStackNavigator();
const RankingStackNavigator = () => {
  return (
    <RankingStack.Navigator initialRouteName="RankingScr" screenOptions={{ headerShown: false }}>
      <RankingStack.Screen name="RankingSc" component={Ranking} />
    </RankingStack.Navigator>
  )
}

const ProfileStack = createStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileScr" screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScr" component={Profile} />
      <ProfileStack.Screen name="SettingScreen" component={SettingScreen} />
      <ProfileStack.Screen name="AccountSettings" component={AccountSettings} />
      <ProfileStack.Screen name="Notifications" component={Notifications} />
      <ProfileStack.Screen name="ReportProblem" component={ReportProblem} />
      <ProfileStack.Screen name="WatchTutorial" component={WatchTutorial} />
      <ProfileStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <ProfileStack.Screen name="AvatarUpload" component={AvatarUpload} />
      <ProfileStack.Screen name='RecentQuizzes' component={RecentQuizzes} />
    </ProfileStack.Navigator>
  )
}

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Points" component={Points} />
      <HomeStack.Screen name='Streak' component={Streak} />
      <HomeStack.Screen name='StreakInfo' component={StreakInfo} />
      <HomeStack.Screen name='CreateFlashcard' component={CreateFlashcard} />
      <HomeStack.Screen name='SelectFlashcardTitle' component={SelectFlashcardTitle} />
      <HomeStack.Screen name='CurratedQuizzes' component={CurratedQuizzes} />
    </HomeStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Play" component={PlayStackNavigator} />
      <Tab.Screen name="Ranking" component={RankingStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

const MainStack = createStackNavigator();
export const MainStackNavigator = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Use `null` for loading state
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        try {
          const userInfo = await getMe();
          dispatch(setUser(userInfo));
          setIsLoggedIn(true);
        } catch (error) {
          await AsyncStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      
      setIsLoading(false); // Set loading to false after the check is done
    };

    checkLoginStatus();
  }, [dispatch]);

  return (
    <>
    {isLoading?
    <View // Update the path to your image
      style={styles.loadingContainer}
      >
      <Image source={require('../../assets/splash.png')} style={styles.image} />
      {/* <ActivityIndicator size="large" color="#3498db" /> */}
    </View>:
    <MainStack.Navigator initialRouteName={isLoggedIn? "Main": "Welcome"} screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Welcome" component={Welcome} />
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="Register" component={Register} />
      <MainStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <MainStack.Screen name="EmailVerify" component={EmailVerify} />
      <MainStack.Screen name="Main" component={TabNavigator} />

      <ProfileStack.Screen name="ProfileScr" component={Profile} />
      <ProfileStack.Screen name="SettingScreen" component={SettingScreen} />
      <ProfileStack.Screen name="AccountSettings" component={AccountSettings} />
      <ProfileStack.Screen name="Notifications" component={Notifications} />
      <ProfileStack.Screen name="ReportProblem" component={ReportProblem} />
      <ProfileStack.Screen name="WatchTutorial" component={WatchTutorial} />
      <ProfileStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <ProfileStack.Screen name="AvatarUpload" component={AvatarUpload} />
      <ProfileStack.Screen name='RecentQuizzes' component={RecentQuizzes} />
      {/* <MainStack.Screen name="Streak" component={StreakStackNavigator} /> */}
    </MainStack.Navigator> }
    </>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

