import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../types';

const WorkoutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <Button
        title="Workout"
        onPress={() =>
          navigation.navigate('ListOfExercise', { caption: 'sfd' })
        }
      />
    </SafeAreaView>
  );
};
export default WorkoutScreen;
