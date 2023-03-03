import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import RoutineControl from '@components/routineActions/routineControl/RoutineControl.component';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  loading,
  reodering,
  selectedPlan,
  selectedRoutine,
  workoutPlans,
} from 'redux/exercises/exercises.slice';
import AddPlanComponent from 'components/modals/AddPlanOrRoutine/AddPlan.component';
import { getAllPlans } from 'redux/exercises/thunks/workoutPlan.thunk';
import WorkoutPlanSelectorComponent from 'components/workoutPlans/WorkoutPlanSelector/WorkoutPlanSelector.component';
import { Routine, WorkoutExercise, WorkoutPlan } from 'redux/types';
import WorkoutExercisesList from 'components/workoutExercises/WorkoutExercisesList.component';
import WorkoutExercisesListDragable from 'components/workoutExercises/WorkoutListDragable.component';

const WorkoutScreen = () => {
  const [data, setData] = useState<WorkoutPlan[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    []
  );
  const plans = useAppSelector(workoutPlans);
  const selectedItem: WorkoutPlan | undefined = useAppSelector(selectedPlan);
  const routine: Routine | undefined = useAppSelector(selectedRoutine);
  const isLoading = useAppSelector(loading);
  const isReordering = useAppSelector(reodering);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getAllPlans());
  }, [dispatch]);
  useEffect(() => {
    setData(plans || []);
  }, [plans]);
  useEffect(() => {
    setWorkoutExercises(routine?.data || []);
  }, [routine]);

  useEffect(() => {
    console.log(routine);
  }, [routine]);
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);
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
      {plans?.length ? (
        <WorkoutPlanSelectorComponent data={data} />
      ) : (
        <AddPlanComponent title={'Create workout plan'} />
      )}
      {isReordering ? (
        <WorkoutExercisesListDragable
          data={workoutExercises}
          setData={setWorkoutExercises}
        />
      ) : (
        <WorkoutExercisesList />
      )}

      {routine && selectedItem ? (
        <RoutineControl
          data={workoutExercises}
          routineId={routine.id}
          planName={selectedItem.name || ''}
        />
      ) : null}
    </SafeAreaView>
  );
};
export default WorkoutScreen;
