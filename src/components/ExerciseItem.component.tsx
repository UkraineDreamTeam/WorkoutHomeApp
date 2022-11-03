import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Exercise } from '../redux/exercises/types';

const ExerciseItem = (data: Exercise) => {
  const { gifUrl, name, bodyPart, target } = data;
  return (
    <TouchableOpacity>
      <Image source={{ uri: gifUrl }} />
      <View>
        <View>
          <Text> {name}</Text>
          <Text> {bodyPart}</Text>
        </View>
        <Text> {target}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseItem;
