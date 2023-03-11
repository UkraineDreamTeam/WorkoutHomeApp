import React, { FC, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { WorkoutExercise } from 'redux/types';
import FastImage from 'react-native-fast-image';
import { TYPOGRAPHY } from 'shared/theme';
import SetItemComponent from 'components/workoutCarousel/SetIem.component';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  isRest,
  setArrayOfSets,
  setsArray,
} from 'redux/workoutTimer/workoutTimer.slice';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { WorkoutItemInProgress } from 'redux/workoutTimer/types';

const WORKOUT_EXERCISE_ITEM_HEIGHT = Dimensions.get('screen').height * 0.8;
const IMAGE_SIZE = Dimensions.get('screen').width - 40;
const SETS_SIZE = WORKOUT_EXERCISE_ITEM_HEIGHT - IMAGE_SIZE - 40;

type Props = {
  workoutItem: WorkoutExercise;
  startTimer: () => void;
};

const WorkoutItem: FC<Props> = ({ workoutItem, startTimer }) => {
  const rest = useAppSelector(isRest);
  const sets = useAppSelector(setsArray);
  const [currentSet, setCurrentSet] = useState<
    WorkoutItemInProgress | undefined
  >();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (workoutItem.sets?.length && workoutItem?.routineId) {
      dispatch(
        setArrayOfSets({ data: workoutItem.sets, id: workoutItem.routineId })
      );
    }
  }, []);

  useEffect(() => {
    if (sets && workoutItem.routineId && sets[workoutItem.routineId]?.length) {
      setCurrentSet(sets[workoutItem.routineId][0]);
    }
  }, [sets]);

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
        {currentSet ? <SetItemComponent data={currentSet} startTimer={startTimer} /> : null}
        {sets &&
        workoutItem.routineId &&
        sets[workoutItem.routineId]?.length ? (
          <FlatList
            data={sets[workoutItem.routineId].filter(el => el.isCompleted)}
            renderItem={({ item }) => (
              <TextWrapperComponent>
                {item.reps} reps {item.weight} {item.duration.minutes}:
                {item.duration.seconds}
              </TextWrapperComponent>
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : null}
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
