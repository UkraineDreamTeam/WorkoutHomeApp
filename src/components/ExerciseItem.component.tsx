import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Exercise } from '../redux/exercises/types';
import { getFileLocationUri } from '../utils/utils';

const ExerciseItem = (data: Exercise) => {
  const { gifUrl, name, bodyPart, target, id } = data;
  return (
    <TouchableOpacity>
      <Image
        source={{ uri: getFileLocationUri(gifUrl, id) }}
        style={style.image}
      />
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
const style = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
});
export default ExerciseItem;
