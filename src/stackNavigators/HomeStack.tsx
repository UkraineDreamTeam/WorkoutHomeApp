import React, { useEffect } from 'react';
import Workout from '../screens/WorkoutScreen';
import ListOfExercisesScreen from '../screens/ListOfExercisesScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import { HomeTabParamList } from '../types/types';
import { useAppDispatch } from '../redux/store';
import { getExercises } from '../redux/exercises/exrcises.thunk';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from '@react-native-firebase/auth';

const HomeStack = createStackNavigator<HomeTabParamList>();

const HomeNavigator = () => {
  const dispatch = useAppDispatch();
  const signIn = async () => {
    try {
      const userSub = async () => await firebase.auth().signInAnonymously();
      return userSub;
    } catch (error) {}
  };

  useEffect(() => {
    signIn().then(() => dispatch(getExercises()));
  }, [dispatch]);

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
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
