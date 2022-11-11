import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExerciseScreenProps } from '../types/types';

const ExerciseScreen = ({ navigation }: ExerciseScreenProps) => {
  useEffect(() => {}, []);
  return (
    <SafeAreaView>
      <Button
        title="Back"
        onPress={async () => {
          // uploads file
          // await reference.putFile(pathToFile);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default ExerciseScreen;
