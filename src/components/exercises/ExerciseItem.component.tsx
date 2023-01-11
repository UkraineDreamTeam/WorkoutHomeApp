import React, { memo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { Exercise, WorkoutExercise } from '@redux/types';
import { getFileLocationUri } from '@shared/utils/utils';
import FastImage from 'react-native-fast-image';
import { COLORS, CustomTheme } from '@shared/theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@shared/types/types';
import { StackNavigationProp } from '@react-navigation/stack';

const ExerciseItem = memo((data: WorkoutExercise) => {
  const {
    gifUrl,
    name,
    bodyPart,
    target,
    id,
    time,
    reps,
    sets,
    weight,
    routineId,
  } = data;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={[
        {
          backgroundColor: COLORS.BLOCK_GREY,
          borderRadius: 20,
          width: Dimensions.get('screen').width * 0.95,
          marginHorizontal: Dimensions.get('screen').width * 0.025,
          marginVertical: 6,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('Exercise', data)}
      >
        <View style={styles.imageContainer}>
          <FastImage
            source={{ uri: getFileLocationUri(gifUrl, id) }}
            style={styles.image}
            accessible={true}
            fallback={true}
          />
        </View>
        <View style={[styles.textContainer]}>
          <View>
            <Text style={[styles.exerciseName, styles.text]}>{name}</Text>
            <Text style={[styles.text, styles.subtitle]}>{bodyPart}</Text>
          </View>
          <Text style={[styles.text, styles.subtitle]}>{target}</Text>
        </View>
      </TouchableOpacity>
      {sets || reps || weight || time ? (
        <View style={[{ flexDirection: 'row', padding: 5, marginLeft: 20 }]}>
          <Image
            source={require('@assets/icons/PinkDot.png')}
            style={[{ alignSelf: 'center' }]}
          />

          {sets ? <Text style={[styles.configText]}> {sets} sets</Text> : null}
          {reps ? <Text style={[styles.configText]}> {reps} reps</Text> : null}
          {weight ? (
            <Text style={[styles.configText]}> {weight} kg</Text>
          ) : null}
          {time ? <Text style={[styles.configText]}> {time} </Text> : null}
        </View>
      ) : null}
    </View>
  );
});
const styles = StyleSheet.create({
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

    backgroundColor: 'black',
    // flexShrink: 1,
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
  configText: {
    paddingHorizontal: 10,
    color: COLORS.WHITE,
  },
});
export default ExerciseItem;
