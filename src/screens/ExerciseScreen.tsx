import React from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExerciseScreenProps } from '../types/types';

const ExerciseScreen = ({ navigation }: ExerciseScreenProps) => {
  return (
    <SafeAreaView>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

export default ExerciseScreen;
