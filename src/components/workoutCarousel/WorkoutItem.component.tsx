import React, { FC, useEffect, useMemo, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { WorkoutExercise } from 'redux/types';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import SetItemComponent from 'components/workoutCarousel/SetIem.component';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  currentSetId,
  isRest,
  setCurrentSetId,
  setCurrentWorkout,
  setsArray,
} from 'redux/workoutTimer/workoutTimer.slice';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { WorkoutItemInProgress } from 'redux/workoutTimer/types';
import FullScreenImage from 'components/modals/FullScreenImage.modal';

const WORKOUT_EXERCISE_ITEM_HEIGHT = Dimensions.get('screen').height * 0.7;
const IMAGE_SIZE = 150;
const SETS_SIZE = WORKOUT_EXERCISE_ITEM_HEIGHT - IMAGE_SIZE - 40;

type Props = {
  workoutItem: WorkoutExercise;
  index: number;
  currentItem: number;
};

const WorkoutItem: FC<Props> = ({ workoutItem, index, currentItem }) => {
  const rest = useAppSelector(isRest);
  const sets = useAppSelector(setsArray);
  const setId = useAppSelector(currentSetId);
  const [currentSet, setCurrentSet] = useState<
    WorkoutItemInProgress | undefined
  >();
  const dispatch = useAppDispatch();
  const images = useMemo(() => {
    return [
      { uri: workoutItem.gifUrl },
      ...(workoutItem?.extraImages || []).map(el => ({
        uri: el,
      })),
    ];
  }, [workoutItem]);

  useEffect(() => {
    if (sets && workoutItem.routineId && sets[workoutItem.routineId]?.length) {
      setCurrentSet(sets[workoutItem.routineId].find(el => !el.isCompleted));

      if (currentSet) {
        dispatch(setCurrentSetId(currentSet.id));
      }
    }
  }, [sets]);

  useEffect(() => {
    if (sets && workoutItem.routineId && sets[workoutItem.routineId]?.length) {
      if (index === currentItem) {
        dispatch(setCurrentWorkout(workoutItem.routineId));
      }
    }
  }, []);
  useEffect(() => {
    console.log('setId', setId, currentSet);
  }, [setId]);

  return (
    <View
      style={{
        padding: 20,
        flexDirection: 'column',
        height: WORKOUT_EXERCISE_ITEM_HEIGHT,
        width: Dimensions.get('screen').width,
      }}
    >
      <View style={[styles.photosBackground]}>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <FullScreenImage
              uri={item.uri}
              deletable={false}
              id={workoutItem?.routineId || workoutItem.id}
            />
          )}
          keyExtractor={item => item.uri}
          horizontal={true}
          // numColumns={3}
          style={{
            height: 130,
          }}
        />
      </View>

      <View
        style={{
          height: SETS_SIZE,
        }}
      >
        {currentSet ? (
          <SetItemComponent
            data={currentSet}
            exerciseId={workoutItem?.routineId || ''}
          />
        ) : null}
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
    width: IMAGE_SIZE / 2,
    // alignSelf: 'center',
    // margin: 'auto',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  photoContainer: { flexDirection: 'column' },
  photosBackground: {
    backgroundColor: COLORS.BLACK,
    padding: 10,
    margin: 10,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
  },
});
export default WorkoutItem;
