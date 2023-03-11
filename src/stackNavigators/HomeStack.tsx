import React from 'react';
import WorkoutScreen from '@screens/WorkoutScreen';
import ListOfExercisesScreen from '@screens/ListOfExercisesScreen';
import ExerciseScreen from '@screens/ExerciseScreen';
import { HomeTabParamList } from '@shared/types/types';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutInProgress from 'screens/WorkoutInProgressScreen';

const HomeStack = createStackNavigator<HomeTabParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="SelectedRoutine">
      <HomeStack.Screen
        name="SelectedRoutine"
        component={WorkoutScreen}
        navigationKey="SelectedRoutine"
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
        name="WorkoutInProgress"
        component={WorkoutInProgress}
        options={{
          title: 'WorkoutInProgress',
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
