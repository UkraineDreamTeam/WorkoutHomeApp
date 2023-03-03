import React from 'react';
import { Dimensions, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ExerciseItem from 'components/exercises/ExerciseItem.component';
import { Routine } from 'redux/types';
import { useAppSelector } from 'redux/store';
import { selectedRoutine } from 'redux/exercises/exercises.slice';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY } from 'shared/theme';

const WorkoutExercisesList = () => {
  const routine: Routine | undefined = useAppSelector(selectedRoutine);
  return (
    <>
      {routine ? (
        <FlashList
          data={routine?.data || []}
          renderItem={({ item }) => <ExerciseItem data={item} />}
          keyExtractor={item => item?.routineId || item.id}
          estimatedItemSize={132}
          contentContainerStyle={{ paddingBottom: 145 }}
        />
      ) : (
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
      )}
    </>
  );
};

export default WorkoutExercisesList;