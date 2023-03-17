import React, { FC, useMemo } from 'react';

import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import DropShadow from 'react-native-drop-shadow';
import { useAppSelector } from 'redux/store';
import { isRest, time } from 'redux/workoutTimer/workoutTimer.slice';

const AnimatedDropShadow = Animated.createAnimatedComponent(DropShadow);
const TimerComponent: FC<{
  minutes: string;
  seconds: string;
  timer: number;
  shadowAnim: Animated.Value;
}> = ({ seconds, minutes, shadowAnim }) => {
  const timer = useAppSelector(time);
  const isRestTimer = useAppSelector(isRest);

  const getShadowColor = useMemo(() => {
    switch (isRestTimer) {
      case true:
        return COLORS.YELLOW;
        break;
      case false:
        return COLORS.PINK;
        break;
    }
  }, [isRestTimer]);
  return (
    <View>
      <AnimatedDropShadow
        style={{
          shadowColor: timer ? getShadowColor : COLORS.BLUE_GREY,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: timer ? 1 : 0,
          shadowRadius: shadowAnim.interpolate({
            inputRange: [0, 2, 4, 6, 8, 10, 16],
            outputRange: [0, 2, 4, 6, 8, 10, 12],
          }),
          zIndex: -1,
        }}
      >
        <TouchableOpacity style={styles.button}>
          <TextWrapperComponent
            style={{
              padding: 3,
              fontFamily: TYPOGRAPHY.FONTS.bold,
              color: timer ? COLORS.WHITE : 'red',
            }}
          >
            {minutes}:{seconds}
          </TextWrapperComponent>
        </TouchableOpacity>
      </AnimatedDropShadow>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    height: 50,
    backgroundColor: COLORS.BLOCK_GREY,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimerComponent;
