import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Exercise } from '@redux/types';
import Loader from '../ActivityIndicator.component';
import ExerciseItem from './ExerciseItem.component';

const ExerciseList = ({
  exercisesToDisplay,
}: {
  exercisesToDisplay: Exercise[];
}) => {
  return (
    <>
      {exercisesToDisplay ? (
        <FlashList
          data={exercisesToDisplay}
          renderItem={({ item }) => <ExerciseItem {...item} />}
          keyExtractor={item => item.id}
          estimatedItemSize={132}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ExerciseList;
