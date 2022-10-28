import {RouteProp} from '@react-navigation/native';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  Statistics: undefined;
  ListOfExercise: {caption: string};
  Profile: undefined;
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
export type ListOfExerciseRoute = RouteProp<HomeTabParamList, 'ListOfExercise'>;
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  CurrentWorkout: {caption: string};
  ListOfExercise: {caption: string};
  Exercise: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
