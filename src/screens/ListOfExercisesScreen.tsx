import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

import { HomeTabParamList } from '../types/types';

import { useAppSelector } from '../redux/store';
import { exercises } from '../redux/exercises/exercises.slice';
import ExerciseList from '../components/ExerciseList.component';

const ListOfExercisesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();

  const gifs = useAppSelector(exercises);

  return (
    <SafeAreaView>
      <Text>List of exercises </Text>
      <Button
        title="Back"
        onPress={e => {
          e.preventDefault();
          navigation.navigate('CurrentWorkout');
        }}
      />
      {gifs?.length ? <ExerciseList gifs={gifs} /> : null}
    </SafeAreaView>
  );
};
// const style = StyleSheet.create({
//   container: {
//     marginHorizontal: 20,
//     width: Dimensions.get('screen').width - 20,
//   },
// });

export default ListOfExercisesScreen;
