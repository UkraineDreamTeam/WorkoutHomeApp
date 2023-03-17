import React, { FC, useRef, useState } from 'react';

import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { useAppSelector } from 'redux/store';
import { selectedRoutine } from 'redux/exercises/exercises.slice';
import WorkoutItem from 'components/workoutCarousel/WorkoutItem.component';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { WorkoutExercise } from 'redux/types';
import { TYPOGRAPHY } from 'shared/theme';
import TimerComponent from 'components/workoutCarousel/Timer.component';
import { useCountDownTimer } from 'shared/hooks/timer.hook';
const screenWidth = Dimensions.get('window').width;
const WorkoutInProgressCarousel: FC<{ time: number }> = ({ time }) => {
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);

  const routine = useAppSelector(selectedRoutine);
  const flatListRef = useRef<FlatList<WorkoutExercise>>(null);
  const indexRef = useRef(0);
  const { timer, minutes, seconds, shadowAnim } = useCountDownTimer({
    initialValue: time,
  });
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const ind = event.nativeEvent.contentOffset.x / screenWidth;
    const roundIndex = Math.round(ind);
    if (currentExercise !== roundIndex + 1) {
      setCurrentExercise(roundIndex + 1);
    }
    if (roundIndex + 1 === routine?.data.length) {
      handleFinishExercises();
    } else {
      setWorkoutFinished(false);
    }

    indexRef.current = roundIndex;
  };

  const handleFinishExercises = () => setWorkoutFinished(true);

  const handleExerciseFinished = () => {
    flatListRef?.current?.scrollToIndex({
      index: currentExercise + 1,
      animated: true,
    });
  };



  return (
    <View style={[{ width: Dimensions.get('screen').width, paddingTop: 10 }]}>
      <View style={{ height: 80 }}>
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('screen').width,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TimerComponent
            seconds={seconds}
            minutes={minutes}
            timer={timer}
            shadowAnim={shadowAnim}
          />
        </View>

        <TextWrapperComponent style={styles.pagination}>
          {currentExercise} of {routine?.data.length}
        </TextWrapperComponent>
      </View>

      {routine ? (
        <FlatList
          ref={flatListRef}
          data={routine.data}
          renderItem={({ item }) => <WorkoutItem workoutItem={item} />}
          keyExtractor={(item, index) => item.routineId || item.id}
          horizontal={true}
          scrollEnabled={true}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  pagination: {
    textAlign: 'center',
    width: Dimensions.get('screen').width,
    fontSize: 16,
    padding: 15,
  },
  text: {
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  dataText: {
    height: 40,
    width: 40,
    backgroundColor: 'black',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default WorkoutInProgressCarousel;
