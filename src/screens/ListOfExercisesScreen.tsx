import React from 'react';
import { SafeAreaView } from 'react-native';
import Loader from '../components/ActivityIndicator.component';
import ExerciseList from '../components/exercises/ExerciseList.component';
import { exercises } from '../redux/exercises/exercises.slice';
import { useAppSelector } from '../redux/store';

const ListOfExercisesScreen = () => {
  const exerciseList = useAppSelector(exercises);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {exerciseList.length ? <ExerciseList /> : <Loader />}
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
