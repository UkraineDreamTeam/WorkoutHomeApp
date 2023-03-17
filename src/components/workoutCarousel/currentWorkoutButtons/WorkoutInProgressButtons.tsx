import React from 'react';

import { Dimensions, View } from 'react-native';
import FinishButton from 'components/workoutCarousel/currentWorkoutButtons/FinishButton';
import SkipButton from 'components/workoutCarousel/currentWorkoutButtons/SkipButton';
import {styles} from "components/workoutCarousel/currentWorkoutButtons/style";

const WorkoutInProgressButtons = () => {
  return (
    <View
      style={styles.container}
    >
      <SkipButton />
      <FinishButton />
    </View>
  );
};

export default WorkoutInProgressButtons;
