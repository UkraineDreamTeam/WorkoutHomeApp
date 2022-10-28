import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, type PropsWithChildren} from 'react';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  HomeTabParamList,
  HomeTabScreenProps,
  RootStackParamList,
} from '../types';

const WorkoutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <Button
        title="Workout"
        onPress={() => navigation.navigate('ListOfExercise', {caption: 'sfd'})}
      />
    </SafeAreaView>
  );
};

export default WorkoutScreen;
