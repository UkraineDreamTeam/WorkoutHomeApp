import React, { FC, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { WorkoutExercise } from 'redux/types';
import FastImage from 'react-native-fast-image';
import { TYPOGRAPHY } from 'shared/theme';
import SetItemComponent from 'components/workoutCarousel/SetIem.component';
import { WorkoutForm } from 'redux/workoutForm/types';
import { nanoid } from '@reduxjs/toolkit';

const WORKOUT_EXERCISE_ITEM_HEIGHT = Dimensions.get('screen').height * 0.8;
const IMAGE_SIZE = Dimensions.get('screen').width - 40;
const SETS_SIZE = WORKOUT_EXERCISE_ITEM_HEIGHT - IMAGE_SIZE - 40;

type Props = {
  workoutItem: WorkoutExercise;
};
export type WorkoutItemInProgress = WorkoutForm & { isCompleted: boolean };
const WorkoutItem: FC<Props> = ({ workoutItem }) => {
  const [sets, setSets] = useState<WorkoutItemInProgress[]>([]);

  useEffect(() => {
    if (workoutItem.sets?.length) {
      const workoutSets = workoutItem.sets.reduce((current, next) => {
        let setCount = next.sets;
        const arrayOfSets = [];
        while (setCount > 0) {
          arrayOfSets.push({ ...next, id: nanoid(), isCompleted: false });
          setCount--;
        }

        return current.concat(arrayOfSets);
      }, [] as WorkoutItemInProgress[]);

      setSets(workoutSets);

      console.log(workoutSets.length);
    }
  }, []);
  return (
    <View
      style={{
        padding: 20,
        flexDirection: 'column',
        height: WORKOUT_EXERCISE_ITEM_HEIGHT,
      }}
    >
      <FastImage
        source={{ uri: workoutItem.gifUrl }}
        style={styles.fullSizedImage}
        resizeMode="contain"
      />

      <View
        style={{
          height: SETS_SIZE,
        }}
      >
        <FlatList
          data={sets}
          renderItem={({ item }) => <SetItemComponent data={item} />}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fullSizedImage: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    alignSelf: 'center',
    margin: 'auto',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    overflow: 'hidden',
  },
});
export default WorkoutItem;
