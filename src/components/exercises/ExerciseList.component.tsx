import React from 'react';
import { memo } from 'react';
import { FlatList, Dimensions, StyleSheet } from 'react-native';
import { exercises } from '../../redux/exercises/exercises.slice';
import { useAppSelector } from '../../redux/store';
import ExerciseItem from './ExerciseItem.component';

const ExerciseList = memo(() => {
  const gifs = useAppSelector(exercises);
  return (
    <>
      <FlatList
        initialNumToRender={10}
        style={style.container}
        data={gifs}
        renderItem={({ item }) => <ExerciseItem {...item} />}
        keyExtractor={item => item.id}
      />
    </>
  );
});
const style = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    width: Dimensions.get('screen').width,
  },
});

export default ExerciseList;
