import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import RoutineControl from '@components/routineActions/routineControl/RoutineControl.component';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  selectedPlan,
  selectedRoutine,
  workoutPlans,
} from 'redux/exercises/exercises.slice';
import AddPlanComponent from 'components/modals/AddPlanOrRoutine/AddPlan.component';
import { getAllPlans } from 'redux/exercises/thunks/workoutPlan.thunk';
import WorkoutPlanSelectorComponent from 'components/workoutPlans/WorkoutPlanSelector/WorkoutPlanSelector.component';
import { Routine, WorkoutPlan } from 'redux/types';
import { FlashList } from '@shopify/flash-list';
import ExerciseItem from 'components/exercises/ExerciseItem.component';

const WorkoutScreen = () => {
  const [data, setData] = useState<WorkoutPlan[]>([]);
  const plans = useAppSelector(workoutPlans);
  const selectedItem: WorkoutPlan | undefined = useAppSelector(selectedPlan);
  const routine: Routine | undefined = useAppSelector(selectedRoutine);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);
  useEffect(() => {
    setData(plans || []);
  }, [plans]);

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
      {plans ? (
        <WorkoutPlanSelectorComponent data={data} />
      ) : (
        <AddPlanComponent title={'Create workout plan'} />
      )}
      {routine ? (
        <FlashList
          data={routine?.data || []}
          renderItem={({ item }) => <ExerciseItem {...item} />}
          keyExtractor={item => item.routineId}
          estimatedItemSize={132}
        />
      ) : null}
      <RoutineControl />
    </SafeAreaView>
  );
};
export default WorkoutScreen;
