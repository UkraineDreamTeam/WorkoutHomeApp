import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {TYPOGRAPHY, WORKOUT_ACTIONS_LAYOUT} from '@shared/theme';
import { useTheme } from '@react-navigation/native';
import {
  ROUTINE_ACTION_TYPE,
  ROUTINE_EDIT_ACTIONS,
  ROUTINE_EDIT_SVGS,
} from '@shared/constants/constants';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { useAppDispatch } from 'redux/store';
import { startReorder } from 'redux/exercises/exercises.slice';

export const RoutineControlButton: FC<{
  setModalVisible: () => void;
  action: ROUTINE_ACTION_TYPE;
}> = ({ setModalVisible, action }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const SVG = ROUTINE_EDIT_SVGS[action];
  const handlePress = () => {
    switch (action) {
      case 'reorder':
        setModalVisible();
        dispatch(startReorder());
        break;
      case 'delete':
        setModalVisible();
        break;
      case 'editSuperset':
        break;
      case 'rename':
        break;
      default:
        setModalVisible();
    }
  };
  return (
    <Pressable style={[styles.button]} onPress={handlePress}>
      <SVG {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
      <TextWrapperComponent style={{ color: theme.colors.text  , fontFamily: TYPOGRAPHY.FONTS.medium}}>
        {ROUTINE_EDIT_ACTIONS[action]}
      </TextWrapperComponent>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: WORKOUT_ACTIONS_LAYOUT.getPadding(),
    paddingVertical: 10,
    alignItems: 'center',
    width: WORKOUT_ACTIONS_LAYOUT.WIDTH,
  },
});
