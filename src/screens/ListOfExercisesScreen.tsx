import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, FlatList, View } from 'react-native';

import { HomeTabParamList } from '../types/types';

import { useAppSelector } from '../redux/store';
import { exercises } from '../redux/exercises/exercises.slice';
import ExerciseItem from '../components/ExerciseItem.component';

const ListOfExercisesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();

  const gifs = useAppSelector(exercises);

  return (
    <View>
      <Text>List of exercises </Text>
      <Button
        title="Back"
        onPress={e => {
          e.preventDefault();
          navigation.navigate('CurrentWorkout');
        }}
      />
      {gifs && gifs.length ? (
        <FlatList
          data={gifs}
          renderItem={({ item }) => <ExerciseItem key={item.id} {...item} />}
        />
      ) : null}
    </View>
  );
};

export default ListOfExercisesScreen;
