import React from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabBar } from 'src/components/tabbar/BottomTabBar';

import Welcome from 'src/screens/Home/Home';
import Login from 'src/screens/Auth/Login';
import Register from 'src/screens/Auth/Register';
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
import Streak from 'src/screens/Streak/Streak';
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
      <ProfileStack.Screen name="AvatarUpload" component={AvatarUpload} />
    </ProfileStack.Navigator>
  )
}

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
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
  return (
    <MainStack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Welcome" component={Welcome} />
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="Register" component={Register} />
      <MainStack.Screen name="EmailVerify" component={EmailVerify} />
      <MainStack.Screen name="Main" component={TabNavigator} />
      {/* <MainStack.Screen name="Streak" component={StreakStackNavigator} /> */}
    </MainStack.Navigator>
  );
};