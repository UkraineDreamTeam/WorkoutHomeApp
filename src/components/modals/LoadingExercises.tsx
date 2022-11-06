import React from 'react';
import { LoadingProgress } from './LoadingProgress/LoadingProgress';
import { useAppSelector } from '../../redux/store';
import {
  exercisesLoaded,
  totalExercisesCount,
} from '../../redux/exercises/exercises.slice';
import { View, StyleSheet } from 'react-native';

export const LoadingExercises = () => {
  const total = useAppSelector(totalExercisesCount);
  const loaded = useAppSelector(exercisesLoaded);

  const isModalVisible = loaded !== total && total !== 0;
  return isModalVisible ? (
    <View style={style.loadingProgressContainer}>
      <LoadingProgress
        title="Loading exercises"
        received={loaded}
        total={total}
      />
    </View>
  ) : null;
};

const style = StyleSheet.create({
  loadingProgressContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    marginTop: 10,
  },
});