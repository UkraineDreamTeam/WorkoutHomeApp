import React, { FC } from 'react';

import { Animated, TouchableOpacity, View } from 'react-native';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import DropShadow from 'react-native-drop-shadow';

const AnimatedDropShadow = Animated.createAnimatedComponent(DropShadow);
const TimerComponent: FC<{
  minutes: string;
  seconds: string;
  timer: number;
  shadowAnim: Animated.Value;
  startTimer: () => void;
}> = ({ seconds, minutes, timer, shadowAnim, startTimer }) => {
  return (
    <View>
      <AnimatedDropShadow
        style={{
          shadowColor: timer ? COLORS.PINK : 'red',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: shadowAnim.interpolate({
            inputRange: [0, 2, 4, 6, 8, 10, 16],
            outputRange: [0, 2, 4, 6, 8, 10, 12],
          }),
          zIndex: -1,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 50,
            backgroundColor: COLORS.BLOCK_GREY,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}

        >
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

export default TimerComponent;
