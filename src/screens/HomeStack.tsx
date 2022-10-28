import React, {useEffect, type PropsWithChildren} from 'react';
import {
  Button,
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
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationEventMap,
} from '@react-navigation/stack';

import Workout from './WorkoutScreen';
import ListOfExercisesScreen from './ListOfExercisesScreen';
import {HomeTabParamList} from '../types';
import StatisticsScreen from './StatisticsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExerciseScreen from './ExerciseScreen';

const HomeStack = createStackNavigator<HomeTabParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenListeners={{
        state: (e: any) => {
          // Do something with the state
          console.log('state changed HomeNavigator', e.data.state);
        },
      }}>
      <HomeStack.Screen
        name="CurrentWorkout"
        component={Workout}
        navigationKey="CurrentWorkout"
        listeners={{}}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ListOfExercise"
        navigationKey="ListOfExercise"
        component={ListOfExercisesScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          title: 'Exercise',
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
