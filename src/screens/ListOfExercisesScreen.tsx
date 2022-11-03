import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Button, Text, StyleSheet, Image, FlatList } from 'react-native';

import { HomeTabParamList } from '../types/types';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { exercises } from '../redux/exercises/exercises.slice';
import { getExercises } from '../redux/exercises/exrcises.thunk';
import ExerciseItem from '../components/ExerciseItem.component';

const ListOfExercisesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
  const dispatch = useAppDispatch();
  const gifs = useAppSelector(exercises);
  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  return (
    <>
      <Text>List of exercises </Text>
      <Button
        title="Back"
        onPress={e => {
          e.preventDefault();
          navigation.navigate('CurrentWorkout');
        }}
      />
      {gifs && gifs.length
        ? gifs.slice(0, 20).map(el => {
            return (
              <Image
                key={el.id}
                source={{ uri: el.gifUrl }}
                style={style.image}
              />
            );
          })
        : null}
      <FlatList
        data={gifs}
        renderItem={({ item }) => <ExerciseItem key={item.id} {...item} />}
      />
    </>
  );
};
const style = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    zIndex: 100,
    backgroundColor: 'white',
  },
});
export default ListOfExercisesScreen;
