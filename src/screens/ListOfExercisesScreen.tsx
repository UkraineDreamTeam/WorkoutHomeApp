import {
  Link,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {
  HomeTabParamList,
  HomeTabScreenProps,
  ListOfExercise,
  ListOfExerciseRoute,
  RootStackParamList,
  RootStackScreenProps,
} from '../types';

const ListOfExercisesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
  const route = useRoute<ListOfExerciseRoute>();

  return (
    <SafeAreaView>
      <Text>List of exercises {route.params.caption}</Text>
      <Button
        title="Back"
        onPress={() => navigation.push('CurrentWorkout', {caption: 'feef'})}
      />
    </SafeAreaView>
  );
};

export default ListOfExercisesScreen;
