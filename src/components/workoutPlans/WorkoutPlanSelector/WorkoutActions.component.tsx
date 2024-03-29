import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import Dots from 'assets/icons/DotsWhite.svg';

const WorkoutActionsComponent = () => {
  return (
    <TouchableOpacity style={[styles.buttonOpen]}>
      <Dots rotation={90} height={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonOpen: {
    width: 50,
    backgroundColor: COLORS.BLACK,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    marginHorizontal: 5,
  },
});
export default WorkoutActionsComponent;
