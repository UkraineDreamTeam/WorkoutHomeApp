import React, { FC, useEffect } from 'react';

import { Dimensions, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectedRoutine } from 'redux/exercises/exercises.slice';
import WorkoutInProgressCarousel from 'components/workoutCarousel/WorkoutInProgress.component';
import { WorkoutInProgressProps } from 'shared/types/types';
import { changeDuration } from 'redux/workoutTimer/workoutTimer.slice';

const WorkoutInProgress: FC<WorkoutInProgressProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const routine = useAppSelector(selectedRoutine);

  const { restTime } = route.params;

  useEffect(() => {
    const interval = setInterval(() => dispatch(changeDuration()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[{ width: Dimensions.get('screen').width }]}>
      {routine ? <WorkoutInProgressCarousel restTime={restTime} /> : null}
    </View>
  );
};

export default WorkoutInProgress;
