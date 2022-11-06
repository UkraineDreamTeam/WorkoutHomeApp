import React from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import RoutineControl from '../components/routineActions/routineControl/RoutineControl.component';

const WorkoutScreen = () => {
  return (
    <SafeAreaView
      style={{
        zIndex: 0,
        position: 'relative',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        flex: 1,
      }}
    >
      <RoutineControl />
    </SafeAreaView>
  );
};
export default WorkoutScreen;
