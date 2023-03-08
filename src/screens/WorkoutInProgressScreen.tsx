import React from 'react';

import { Dimensions, View } from 'react-native';
import { useAppSelector } from 'redux/store';
import { selectedRoutine } from 'redux/exercises/exercises.slice';
import WorkoutInProgressCarousel from 'components/workoutCarousel/WorkoutInProgress.component';

const WorkoutInProgress = () => {
  const routine = useAppSelector(selectedRoutine);
  return (
    <View style={[{ width: Dimensions.get('screen').width }]}>
      {routine ? <WorkoutInProgressCarousel /> : null}
    </View>
  );
};

export default WorkoutInProgress;
