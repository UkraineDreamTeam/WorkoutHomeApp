import React, { FC } from 'react';
import { ListRenderItem, Pressable, Text, View } from 'react-native';
import { Routine } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  selectedRoutine,
  selectRoutine,
} from 'redux/exercises/exercises.slice';
import { COLORS } from '@shared/theme';

type Props = {
  item: Routine;
};
const RoutineItemComponent: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const routine = useAppSelector(selectedRoutine);
  const handlePress = () => {
    if (item) dispatch(selectRoutine(item));
  };

  return (
    <View style={[]}>
      <Pressable
        onPress={handlePress}
        style={[
          {
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: routine?.id === item.id ? 6 : 5,
          },
        ]}
      >
        <Text
          style={{
            fontSize: routine?.id === item.id ? 16 : 14,
            color: COLORS.WHITE,
            borderBottomWidth: routine?.id === item.id ? 3 : 2,
            borderColor: COLORS.WHITE,
            paddingBottom: routine?.id === item.id ? 2 : 4,
          }}
        >
          {item.name}
        </Text>
      </Pressable>
    </View>
  );
};

export const RenderRoutineItemComponent: ListRenderItem<Routine> = ({
  item,
}) => {
  return <RoutineItemComponent item={item} />;
};
