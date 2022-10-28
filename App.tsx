import React, {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  DarkTheme,
  NavigationContainer,
  RouteProp,
  useNavigation,
  useNavigationContainerRef,
  useRoute,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import Workout from './src/screens/WorkoutScreen';
import ListOfExercisesScreen from './src/screens/ListOfExercisesScreen';
import {RootStackParamList} from './src/types';
import HomeNavigator from './src/screens/HomeStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatisticsScreen from './src/screens/StatisticsScreen';
import Profile from './src/screens/Profile';
import MyTabBar from './src/components/TabBar';
import ExerciseScreen from './src/screens/ExerciseScreen';

const TabStack = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  // You can also use a regular ref with `React.useRef()`
  const myTheme = {DarkTheme};
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: false,
        colors: {...DarkTheme.colors, background: '#36404F'},
      }}>
      <TabStack.Navigator
        initialRouteName="Home"
        screenOptions={{tabBarStyle: {backgroundColor: '#343D54'}}}
        tabBar={props => <MyTabBar {...props} navigationRef={navigationRef} />}>
        <TabStack.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: 'My workout',
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'transparent',
          }}
        />
        <TabStack.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            title: 'Statistics',
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'transparent',
          }}
        />
        <TabStack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'transparent',
          }}
        />
      </TabStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
