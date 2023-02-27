import React from 'react';
import { FlashList } from '@shopify/flash-list';
import ExerciseItem from 'components/exercises/ExerciseItem.component';
import { Routine } from 'redux/types';
import { useAppSelector } from 'redux/store';
import { selectedRoutine } from 'redux/exercises/exercises.slice';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';

const WorkoutExercisesList = () => {
  const routine: Routine | undefined = useAppSelector(selectedRoutine);
  return (
    <>
      {routine ? (
        <FlashList
          data={routine?.data || []}
          renderItem={({ item }) => <ExerciseItem {...item} />}
          keyExtractor={item => item?.routineId || item.id}
          estimatedItemSize={132}
          contentContainerStyle={{ paddingBottom: 145 }}
        />
      ) : (
        <TextWrapperComponent>
          Add routine to be able add exercises to workout
        </TextWrapperComponent>
      )}
    </>
  );
};

export default WorkoutExercisesList;
