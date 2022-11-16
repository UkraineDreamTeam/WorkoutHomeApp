import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Exercise } from '../../redux/types';
import { getFileLocationUri } from '../../utils/utils';
import FastImage from 'react-native-fast-image';
import { CustomTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';

const ExerciseItem = memo((data: Exercise) => {
  const { gifUrl, name, bodyPart, target, id } = data;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={style.cardContainer}
      onPress={() => navigation.navigate('Exercise', data)}
    >
      <View style={style.imageContainer}>
        <FastImage
          source={{ uri: getFileLocationUri(gifUrl, id) }}
          style={style.image}
          accessible={true}
          fallback={true}
        />
      </View>
      <View style={[style.textContainer]}>
        <View>
          <Text style={[style.exerciseName, style.text]}>{name}</Text>
          <Text style={[style.text, style.subtitle]}>{bodyPart}</Text>
        </View>
        <Text style={[style.text, style.subtitle]}>{target}</Text>
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
    fontWeight: '600',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  text: { color: CustomTheme.colors.text, flexShrink: 1 },
  subtitle: { fontWeight: '200' },
});
export default ExerciseItem;
