import React from 'react';
import Workout from '../screens/WorkoutScreen';
import ListOfExercisesScreen from '../screens/ListOfExercisesScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import { HomeTabParamList } from '../types/types';
import { createStackNavigator } from '@react-navigation/stack';
import FiltersScreen from '../screens/FiltersScreen';

const HomeStack = createStackNavigator<HomeTabParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="CurrentWorkout">
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
      <HomeStack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
