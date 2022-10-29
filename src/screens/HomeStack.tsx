import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from './WorkoutScreen';
import ListOfExercisesScreen from './ListOfExercisesScreen';
import ExerciseScreen from './ExerciseScreen';
import { HomeTabParamList } from '../types';

const HomeStack = createStackNavigator<HomeTabParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
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
