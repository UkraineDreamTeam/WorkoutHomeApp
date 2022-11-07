import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../components/ActivityIndicator.component';
import ExerciseList from '../components/exercises/ExerciseList.component';
import { exercises } from '../redux/exercises/exercises.slice';
import { useAppSelector } from '../redux/store';
import { RootStackParamList } from '../types/types';

const ListOfExercisesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const exerciseList = useAppSelector(exercises);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
        <Text>Filters</Text>
      </TouchableOpacity>
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
