import React, { FC } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';

import DeleteIconComponent from 'components/icons/DeleteIcon.component';
import Done from 'assets/icons/CheckIcon.svg';
import { WorkoutItemInProgress } from 'redux/workoutTimer/types';

const SetItemComponent: FC<{
  data: WorkoutItemInProgress;
  startTimer: () => void;
}> = ({ data, startTimer }) => {
  const {
    sets,
    reps,
    duration,
    durationMS,
    weight,
    setRestTime,
    setRestTimeMS,
    isCompleted,
  } = data;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        paddingVertical: 5,
        // width: Dimensions.get('screen').width - 40,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: isCompleted ? COLORS.PINK : COLORS.BLUE_GREY,
          flexDirection: 'row',
          borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
          padding: 10,
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <DeleteIconComponent />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextWrapperComponent style={[style.dataText, { width: 35 }]}>
            {reps || '-'}
          </TextWrapperComponent>
          <TextWrapperComponent style={[style.text]}>reps</TextWrapperComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextWrapperComponent style={[style.dataText, { width: 45 }]}>
            {weight || '-'}
          </TextWrapperComponent>
          <TextWrapperComponent style={style.text}>kg</TextWrapperComponent>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextWrapperComponent style={[style.dataText, { width: 35 }]}>
            {duration.minutes || '00'}
          </TextWrapperComponent>
          <TextWrapperComponent style={{ padding: 3 }}>:</TextWrapperComponent>
          <TextWrapperComponent style={[style.dataText, { width: 35 }]}>
            {duration.seconds || '00'}
          </TextWrapperComponent>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.PINK,
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
            alignSelf: 'center',
            marginHorizontal: 5,
          }}
          onPress={() => startTimer()}
        >
          <Done />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  text: {
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
    paddingHorizontal: 10,
    textAlignVertical: 'bottom',
  },
  dataText: {
    height: 35,
    width: 35,
    backgroundColor: 'black',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default SetItemComponent;
