import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeTabParamList } from '../types/types';

const ListOfExercisesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();

  return (
    <ScrollView style={{ zIndex: 1 }}>
      <Text>List of exercises </Text>
      <Button
        title="Back"
        onPress={() => navigation.navigate('CurrentWorkout')}
      />
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>

      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      {/* <Image
        source={require('../assets/icons/Home.png')}
        style={{ width: 100, height: 500 }}
      /> */}

      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>

      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises </Text>
      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>

      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>
      <Text>List of exercises last </Text>
    </ScrollView>
  );
};
export default ListOfExercisesScreen;
