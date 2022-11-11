import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { WORKOUT_ACTIONS_LAYOUT } from '../../../theme';
import { useTheme } from '@react-navigation/native';
import {
  ROUTINE_ACTION_TYPE,
  ROUTINE_EDIT_ACTIONS,
  ROUTINE_EDIT_SVGS,
} from '../../../constants';

export const RoutineControlButton = ({
  setModalVisible,
  action,
}: {
  setModalVisible: () => void;
  action: ROUTINE_ACTION_TYPE;
}) => {
  const theme = useTheme();
  const SVG = ROUTINE_EDIT_SVGS[action];
  return (
    <Pressable style={[styles.button]} onPress={setModalVisible}>
      <SVG {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
      <Text style={{ color: theme.colors.text }}>
        {ROUTINE_EDIT_ACTIONS[action]}
      </Text>
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
