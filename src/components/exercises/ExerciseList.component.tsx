import { useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState, memo, useRef } from 'react';
import { Dimensions, StyleSheet, Animated } from 'react-native';
import { exercises, filters } from '../../redux/exercises/exercises.slice';
import { Exercise } from '../../redux/exercises/types';
import { useAppSelector } from '../../redux/store';
import { ListOfExerciseRoute } from '../../types/types';
import Loader from '../ActivityIndicator.component';
import FilterContainer from '../filters/FilterModal.component';
import ExerciseItem from './ExerciseItem.component';
import SearchInput from './SearchInput.component';

const ExerciseList = memo(() => {
  const animRef = useRef(new Animated.Value(0)).current;
  const animFlatlist = useCallback(() => {
    Animated.timing(animRef, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animRef]);

  const animFadeFlatlist = useCallback(() => {
    Animated.timing(animRef, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animRef]);
  const exerciseList = useAppSelector(exercises);
  const filter = useAppSelector(filters);
  const route = useRoute<ListOfExerciseRoute>();
  const [exercisesToDisplay, setExercisesToDisplay] = useState<Exercise[]>([]);
  const [text, onChangeText] = useState('');
  const [show, setShow] = useState(false);

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

    setExercisesToDisplay(newList);
  }, [exerciseList, filterExercises, text, route]);
  const titles = {
    bodyPart: 'Category',
    type: 'Type',
    target: 'Muscle',
    equipment: 'Equipment',
  };
  return (
    <>
      <SearchInput
        text={text}
        onChangeText={onChangeText}
        showFilters={setShow}
      />
      <FilterContainer />
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
});
const style = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
  },
  filterButton: {
    borderColor: 'white',
    paddingVertical: 5,
  },
});

export default ExerciseList;
