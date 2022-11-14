import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';

import { StackScreenProps } from '@react-navigation/stack';
import { Exercise } from '../redux/exercises/types';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  Statistics: undefined;
  ListOfExercise: undefined;
  Profile: undefined;
  Exercise: undefined;
};

export type WorkoutScreenProps = StackScreenProps<
  HomeTabParamList,
  'CurrentWorkout'
>;
export type StatisticsScreenProps = StackScreenProps<
  RootStackParamList,
  'Statistics'
>;
export type ListOfExercise = StackScreenProps<
  HomeTabParamList,
  'ListOfExercise'
>;
export type ExerciseScreenProps = StackScreenProps<
  HomeTabParamList,
  'Exercise'
>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type ListOfExerciseRoute = RouteProp<HomeTabParamList, 'ListOfExercise'>;
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  CurrentWorkout: undefined;
  ListOfExercise: { list?: Exercise[] };
  Exercise: undefined;
  Filters: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
