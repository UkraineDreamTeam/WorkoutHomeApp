import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ExerciseItem from 'components/listOfExercisesComponents/ExerciseItem.component';
import { Routine, WorkoutPlan } from 'redux/types';
import { useAppSelector } from 'redux/store';
import {
  loading,
  selectedPlan,
  selectedRoutine,
} from 'redux/exercises/exercises.slice';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import { nanoid } from '@reduxjs/toolkit';

const WorkoutExercisesList = () => {
  const routine: Routine | undefined = useAppSelector(selectedRoutine);
  const plan: WorkoutPlan | undefined = useAppSelector(selectedPlan);
  const isLoading = useAppSelector(loading);

  useEffect(() => {
    console.log(routine?.data[0]);
  }, [routine]);

  return (
    <>
      {routine ? (
        <FlashList
          data={routine?.data || []}
          renderItem={({ item }) => <ExerciseItem data={item} />}
          keyExtractor={item => item.routineId || nanoid()}
          estimatedItemSize={132}
          contentContainerStyle={{ paddingBottom: 145 }}
        />
      ) : null}
      {plan && !routine ? (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('screen').height * 0.7,
          }}
        >
          <TextWrapperComponent
            style={{
              fontSize: 18,
              marginHorizontal: 30,
              backgroundColor: COLORS.BLOCK_GREY,
              padding: 20,
              borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
              textAlign: 'center',
            }}
          >
            Add routine to be able add exercises
          </TextWrapperComponent>
        </View>
      ) : null}
    </>
  );
};

export default WorkoutExercisesList;
