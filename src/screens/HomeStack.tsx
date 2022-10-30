import React from 'react';
import Workout from './WorkoutScreen';
import ListOfExercisesScreen from './ListOfExercisesScreen';
import ExerciseScreen from './ExerciseScreen';
import { HomeTabParamList } from '../types/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HomeStack = createBottomTabNavigator<HomeTabParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      sceneContainerStyle={{ position: 'relative' }}
      tabBar={() => null}
    >
      <HomeStack.Screen
        name="CurrentWorkout"
        component={Workout}
        navigationKey="CurrentWorkout"
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
