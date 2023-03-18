import React, { useCallback, useMemo } from 'react';

import { TouchableOpacity, View } from 'react-native';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import { styles } from 'components/workoutCarousel/currentWorkoutButtons/style';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  currentExercise,
  handleSkipExercise,
  isRest,
  setRestTimer,
} from 'redux/workoutTimer/workoutTimer.slice';

const SkipButton = () => {
  const rest = useAppSelector(isRest);
  const id = useAppSelector(currentExercise);
  const dispatch = useAppDispatch();
  const getSkipText = useMemo(() => {
    switch (rest) {
      case true:
        return 'Skip rest';
        break;
      case false:
        return 'Skip exercise';
        break;
    }
  }, [rest]);

  const handleSkip = useCallback(() => {
    switch (rest) {
      case true:
        dispatch(setRestTimer(0));
        break;
      case false:
        console.log('skip');
        dispatch(handleSkipExercise());
        break;
    }
  }, [rest]);
  return (
    <TouchableOpacity style={[styles.button]} onPress={handleSkip}>
      <View
        style={{
          backgroundColor: COLORS.YELLOW,
          borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
          ...styles.button,
        }}
      >
        <TextWrapperComponent style={styles.text}>
          {getSkipText}
        </TextWrapperComponent>
      </View>
    </TouchableOpacity>
  );
};

export default SkipButton;
