import React from 'react';
import WorkoutScreen from '@screens/WorkoutScreen';
import ListOfExercisesScreen from '@screens/ListOfExercisesScreen';
import ExerciseScreen from '@screens/ExerciseScreen';
import { HomeTabParamList } from '@shared/types/types';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator<HomeTabParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="CurrentWorkout">
      <HomeStack.Screen
        name="CurrentWorkout"
        component={WorkoutScreen}
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
