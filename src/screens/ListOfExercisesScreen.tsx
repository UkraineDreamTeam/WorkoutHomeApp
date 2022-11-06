import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import ExerciseList from '../components/exercises/ExerciseList.component';

import { HomeTabParamList } from '../types/types';

const ListOfExercisesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>List of exercises </Text>
      <Button
        title="Back"
        onPress={e => {
          e.preventDefault();
          navigation.navigate('CurrentWorkout');
        }}
      />
      <ExerciseList />
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
