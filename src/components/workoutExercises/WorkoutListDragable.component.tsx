import React from 'react';

import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';
import { Routine, WorkoutPlan } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectedPlan, selectedRoutine } from 'redux/exercises/exercises.slice';
import ExerciseItem from 'components/exercises/ExerciseItem.component';
import { reorderRoutine } from 'redux/exercises/thunks/workoutPlan.thunk';

const WorkoutExercisesListDragable = () => {
  const dispatch = useAppDispatch();
  const routine: Routine | undefined = useAppSelector(selectedRoutine);
  const selectedItem: WorkoutPlan | undefined = useAppSelector(selectedPlan);
  return (
    <NestableScrollContainer>
      {routine?.data && selectedItem?.name ? (
        <NestableDraggableFlatList
          data={routine?.data || []}
          renderItem={({ item }) => <ExerciseItem {...item} />}
          keyExtractor={item => item?.routineId || item.id}
          onDragEnd={({ data }) =>
            dispatch(
              reorderRoutine({
                routineId: routine?.id,
                planName: selectedItem?.name,
                routine: { ...routine, data: data },
              })
            )
          }
        />
      ) : null}
    </NestableScrollContainer>
  );
};

export default WorkoutExercisesListDragable;
