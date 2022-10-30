import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../types/types';

const WorkoutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={{ zIndex: 0 }}>
      <Button
        title="Workout"
        onPress={() => navigation.navigate('ListOfExercise')}
      />
    </SafeAreaView>
  );
};
export default WorkoutScreen;
