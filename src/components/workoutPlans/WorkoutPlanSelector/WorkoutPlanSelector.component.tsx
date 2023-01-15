import React, { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useAppSelector } from 'redux/store';
import { selectedPlan } from 'redux/exercises/exercises.slice';
import { WorkoutPlan } from 'redux/types';
import RoutinesComponent from 'components/workoutPlans/WorkoutPlanSelector/Routines.component';
import WorkoutActionsComponent from 'components/workoutPlans/WorkoutPlanSelector/WorkoutActions.component';
import WorkoutPlanPickerComponent from 'components/workoutPlans/WorkoutPlanSelector/WorkoutPlanPicker.component';

type Props = { data: WorkoutPlan[] };
const WorkoutPlanSelectorComponent: FC<Props> = ({ data }) => {
  const selectedItem: WorkoutPlan | undefined = useAppSelector(selectedPlan);

  return (
    <View
      style={[
        {
          marginVertical: 5,
          flexDirection: 'column',
          width: Dimensions.get('screen').width,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
      >
        <WorkoutPlanPickerComponent data={data} />

        <WorkoutActionsComponent />
      </View>
      <RoutinesComponent selectedItem={selectedItem} />
    </View>
  );
};
export const styles = StyleSheet.create({
  routines: {
    backgroundColor: 'red',
    flex: 1,
    height: '100%',
  },
});

export default WorkoutPlanSelectorComponent;
