import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import Loader from '@components/ActivityIndicator.component';
import ExerciseList from '@components/listOfExercisesComponents/ExerciseList.component';
import SearchInput from '@components/listOfExercisesComponents/SearchInput.component';
import { exercises, loading } from '@redux/exercises/exercises.slice';
import { Exercise } from '@redux/types';
import { useAppSelector } from '@redux/store';

const ListOfExercisesScreen = () => {
  const exerciseList = useAppSelector(exercises);
  const isLoading = useAppSelector(loading);
  const [exercisesToDisplay, setExercisesToDisplay] = useState<Exercise[]>([]);
  const [text, onChangeText] = useState('');

  const filterExercises = useCallback(() => {
    const regExp = new RegExp(`${text}`, 'i');
    return exerciseList.filter(
      exercise =>
        text.length > 0 &&
        (exercise.name.match(regExp)?.length ||
          exercise.target.match(regExp)?.length)
    );
  }, [exerciseList, text]);
  useEffect(() => {
    const newList = text.length > 0 ? filterExercises() : exerciseList;

    setExercisesToDisplay(newList);
  }, [exerciseList, filterExercises, text]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput text={text} onChangeText={onChangeText} />
      {exercisesToDisplay.length && !isLoading ? (
        <ExerciseList exercisesToDisplay={exercisesToDisplay} />
      ) : (
        <>
          <Image
            source={require('../assets/icons/search.png')}
            style={[
              {
                alignSelf: 'center',
                width: Dimensions.get('screen').width * 0.8,
              },
            ]}
            resizeMode={'contain'}
          />
        </>
      )}

      {!exercisesToDisplay.length && isLoading ? <Loader /> : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListOfExercisesScreen;
