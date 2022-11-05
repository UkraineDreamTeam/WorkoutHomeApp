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

      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // paddingBottom: 15,
            // paddingTop: 6,
            flexShrink: 1,
          },
        ]}
      >
        <View style={{ flexShrink: 1 }}>
          <Text
            style={[
              {
                color: theme.colors.text,
                fontWeight: '600',
                // flexShrink: 1,
                // width: Dimensions.get('screen').width * 0.8,
              },
              style.exerciseName,
            ]}
          >
            {name}
          </Text>
          <Text style={[{ color: theme.colors.text, fontWeight: '200' }]}>
            {bodyPart}
          </Text>
        </View>
        <Text style={[{ color: theme.colors.text, fontWeight: '200' }]}>
          {target}
        </Text>
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
    marginRight: 10,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.95,
    marginVertical: 6,
    marginHorizontal: Dimensions.get('screen').width * 0.025,
    backgroundColor: 'black',
    flexShrink: 1,
    padding: 20,
    borderRadius: 20,
  },
  exerciseName: {
    textTransform: 'capitalize',
  },
});
export default ExerciseItem;
