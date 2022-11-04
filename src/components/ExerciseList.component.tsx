import React from 'react';
import { memo } from 'react';
import { FlatList, Dimensions, StyleSheet } from 'react-native';
import { Exercise } from '../redux/exercises/types';
import ExerciseItem from './ExerciseItem.component';

const ExerciseList = memo(({ gifs }: { gifs: Exercise[] }) => {
  return (
    <>
      <FlatList
        initialNumToRender={50}
        style={style.container}
        data={gifs}
        renderItem={({ item }) => <ExerciseItem {...item} />}
        keyExtractor={item => item.id}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </>
  );
});
const style = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    width: Dimensions.get('screen').width - 20,
  },
});

export default ExerciseList;
