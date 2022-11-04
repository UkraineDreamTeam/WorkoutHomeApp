import { useTheme } from '@react-navigation/native';
import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Exercise } from '../redux/exercises/types';
import { getFileLocationUri } from '../utils/utils';
import FastImage from 'react-native-fast-image';

const ExerciseItem = memo((data: Exercise) => {
  const theme = useTheme();
  const { gifUrl, name, bodyPart, target, id } = data;
  return (
    <TouchableOpacity style={style.cardContainer}>
      <View style={style.imageContainer}>
        <FastImage
          source={{ uri: getFileLocationUri(gifUrl, id) }}
          style={style.image}
          accessible={true}
        />
      </View>

      <View>
        <View>
          <Text style={[{ color: theme.colors.text }, style.exerciseName]}>
            {name}
          </Text>
          <Text> {bodyPart}</Text>
        </View>
        <Text> {target}</Text>
      </View>
    </TouchableOpacity>
  );
});
const style = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.9,
  },
  exerciseName: {
    textTransform: 'capitalize',
  },
});
export default ExerciseItem;
