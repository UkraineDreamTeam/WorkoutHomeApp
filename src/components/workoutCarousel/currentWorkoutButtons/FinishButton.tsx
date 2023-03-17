import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { styles } from 'components/workoutCarousel/currentWorkoutButtons/style';

const FinishButton = () => {
  return (
    <TouchableOpacity style={[styles.button]}>
      <View
        style={{
          backgroundColor: COLORS.PINK,
          borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
          ...styles.button,
        }}
      >
        <TextWrapperComponent style={styles.text}>Finish</TextWrapperComponent>
      </View>
    </TouchableOpacity>
  );
};

export default FinishButton;
