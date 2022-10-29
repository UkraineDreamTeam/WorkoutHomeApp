import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { HomeTabParamList, ListOfExerciseRoute } from '../types';

const ListOfExercisesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
  const route = useRoute<ListOfExerciseRoute>();
  return (
    <SafeAreaView>
      <Text>List of exercises {route.params.caption} </Text>
      <Button
        title="Back"
        onPress={() => navigation.push('CurrentWorkout', { caption: 'feef' })}
      />
    </SafeAreaView>
  );
};
export default ListOfExercisesScreen;
