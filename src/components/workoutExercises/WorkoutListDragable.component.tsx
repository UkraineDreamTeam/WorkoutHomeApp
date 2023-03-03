import React, { FC, useEffect, useState } from 'react';

import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import { Routine, WorkoutExercise, WorkoutPlan } from 'redux/types';
import { useAppSelector } from 'redux/store';
import { selectedPlan, selectedRoutine } from 'redux/exercises/exercises.slice';
import ExerciseItem from 'components/exercises/ExerciseItem.component';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { View } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';

const WorkoutExercisesListDragable: FC<{
  data: WorkoutExercise[];
  setData: (props: WorkoutExercise[]) => void;
}> = ({ data, setData }) => {
  const routine: Routine | undefined = useAppSelector(selectedRoutine);
  const selectedItem: WorkoutPlan | undefined = useAppSelector(selectedPlan);
  const [startDrag, setStartDrag] = useState(false);
  useEffect(() => {
    if (routine?.data) {
      setData(routine.data);
    }
  }, []);
  useEffect(() => {
    console.log(startDrag);
  }, [startDrag]);

  return (
    <View style={{ paddingBottom: 200 }}>
      <TextWrapperComponent
        style={{
          backgroundColor: COLORS.PINK,
          borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
          margin: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          fontWeight: '600',
        }}
      >
        Drag exercise using long press
      </TextWrapperComponent>
      <NestableScrollContainer style={{ paddingBottom: 145 }}>
        {routine?.data && selectedItem?.name ? (
          <NestableDraggableFlatList
            data={data}
            renderItem={({ item, drag }) => (
              <ExerciseItem
                data={item}
                onLongPress={drag}
                startDrag={startDrag}
              />
            )}
            keyExtractor={item => item.routineId || item.id}
            onDragEnd={({ data }) => {
              setData(data);
              setStartDrag(false);
            }}
            onDragBegin={() => {
              console.log('begin');
              setStartDrag(true);
            }}
            scrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 145 }}
          />
        ) : null}
      </NestableScrollContainer>
    </View>
  );
};

export default WorkoutExercisesListDragable;
