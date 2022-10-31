import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExerciseScreenProps } from '../types/types';

import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

const ExerciseScreen = ({ navigation }: ExerciseScreenProps) => {
  useEffect(() => {}, []);
  return (
    <SafeAreaView>
      <Button
        title="Back"
        onPress={async () => {
          const reference = storage().ref('black-t-shirt-sm.png');
          const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
          // uploads file
          await reference.putFile(pathToFile);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default ExerciseScreen;
