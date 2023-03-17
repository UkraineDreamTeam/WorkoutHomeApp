import React, { FC, useEffect } from 'react';

import { Dimensions, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectedRoutine } from 'redux/exercises/exercises.slice';
import WorkoutInProgressCarousel from 'components/workoutCarousel/WorkoutInProgress.component';
import { WorkoutInProgressProps } from 'shared/types/types';
import { setExerciseTimer } from 'redux/workoutTimer/workoutTimer.slice';
import WorkoutInProgressButtons from 'components/workoutCarousel/currentWorkoutButtons/WorkoutInProgressButtons';

const WorkoutInProgress: FC<WorkoutInProgressProps> = ({ route }) => {

  const dispatch = useAppDispatch();
  const routine = useAppSelector(selectedRoutine);

  const { time } = route.params;

  useEffect(() => {
    dispatch(setExerciseTimer(time));
  }, []);
  return (
    <View style={[{ width: Dimensions.get('screen').width }]}>
      {routine ? <WorkoutInProgressCarousel time={time} /> : null}
      <WorkoutInProgressButtons />
    </View>
  );
};

export default WorkoutInProgress;
