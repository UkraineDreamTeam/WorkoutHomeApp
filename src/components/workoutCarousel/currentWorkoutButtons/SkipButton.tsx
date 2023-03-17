import React, { useMemo } from 'react';

import { TouchableOpacity, View } from 'react-native';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import { styles } from 'components/workoutCarousel/currentWorkoutButtons/style';
import { useAppSelector } from 'redux/store';
import { isRest } from 'redux/workoutTimer/workoutTimer.slice';

const SkipButton = () => {
  const rest = useAppSelector(isRest);
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
  return (
    <TouchableOpacity style={[styles.button]}>
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
