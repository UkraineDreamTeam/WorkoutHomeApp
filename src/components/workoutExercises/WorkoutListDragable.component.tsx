import React, { FC, useEffect, useState } from 'react';

import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';

import { Routine, WorkoutExercise, WorkoutPlan } from 'redux/types';
import { useAppSelector } from 'redux/store';
import { selectedPlan, selectedRoutine } from 'redux/exercises/exercises.slice';
import ExerciseItem from 'components/exercises/ExerciseItem.component';

const WorkoutExercisesListDragable: FC<{
  data: WorkoutExercise[];
  setData: (props: WorkoutExercise[]) => void;
}> = ({ data, setData }) => {
  const routine: Routine | undefined = useAppSelector(selectedRoutine);
  const selectedItem: WorkoutPlan | undefined = useAppSelector(selectedPlan);
  const [startDrag, setStartDrag] = useState(false);
  useEffect(() => {
    if (routine?.data) {
      setData(routine.data);
    }
  }, []);

  return (
    <NestableScrollContainer style={{ paddingBottom: 145 }}>
      {routine?.data && selectedItem?.name ? (
        <NestableDraggableFlatList
          data={data}
          renderItem={({ item, drag }) => (
            <ExerciseItem
              data={item}
              onLongPress={drag}
              startDrag={startDrag}
            />
          )}
          keyExtractor={item => item.routineId || item.id}
          onDragEnd={({ data }) => {
            setData(data);
            setStartDrag(false);
          }}
          onDragBegin={() => {
            setStartDrag(true);
          }}
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 145 }}
        />
      ) : null}
    </NestableScrollContainer>
  );
};

export default WorkoutExercisesListDragable;
