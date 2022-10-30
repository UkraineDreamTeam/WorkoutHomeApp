import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

import { RootStackParamList } from '../types/types';

const WorkoutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  return (
    <SafeAreaView style={{ zIndex: 0 }}>
      <Pressable
        onPress={() => navigation.navigate('ListOfExercise')}
        style={{
          borderWidth: 2,
          borderColor: theme.colors.border,
          height: 20,
          width: 30,
        }}
      >
        <Text>press me</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default WorkoutScreen;
