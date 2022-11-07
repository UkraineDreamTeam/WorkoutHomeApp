import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState } from 'react';
import { memo } from 'react';

import { exercises } from '../../redux/exercises/exercises.slice';
import { Exercise } from '../../redux/exercises/types';
import { useAppSelector } from '../../redux/store';
import ExerciseItem from './ExerciseItem.component';
import SearchInput from './SearchInput.component';

const ExerciseList = memo(() => {
  const exerciseList = useAppSelector(exercises);
  const [exercisesToDisplay, setExercisesToDisplay] = useState<Exercise[]>([]);
  const [text, onChangeText] = React.useState('');

  const filterExercises = useCallback(() => {
    const reGexp = new RegExp(`${text}`, 'i');
    return exerciseList.filter(
      exercise =>
        text.length > 0 &&
        (exercise.name.match(reGexp)?.length ||
          exercise.target.match(reGexp)?.length)
    );
  }, [exerciseList, text]);
  useEffect(() => {
    const newList = text.length > 0 ? filterExercises() : exerciseList;
    console.log('dee');

    setExercisesToDisplay(newList);
  }, [exerciseList, filterExercises, text]);
  return (
    <>
      <SearchInput text={text} onChangeText={onChangeText} />

      <FlashList
        data={exercisesToDisplay}
        renderItem={({ item }) => <ExerciseItem {...item} />}
        keyExtractor={item => item.id}
        estimatedItemSize={132}
      />
    </>
  );
});
// const style = StyleSheet.create({
//   container: {
//     width: Dimensions.get('screen').width,
//   },
// });

export default ExerciseList;
