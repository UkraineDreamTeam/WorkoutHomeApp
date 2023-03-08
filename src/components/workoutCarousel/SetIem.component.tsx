import React, { FC } from 'react';

import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { WorkoutItemInProgress } from 'components/workoutCarousel/WorkoutItem.component';
import DeleteIconComponent from 'components/icons/DeleteIcon.component';
import Done from 'assets/icons/CheckIcon.svg';

const SetItemComponent: FC<{ data: WorkoutItemInProgress }> = ({ data }) => {
  const {
    sets,
    reps,
    duration,
    durationMS,
    weight,
    setRestTime,
    setRestTimeMS,
  } = data;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        paddingVertical: 5,
        width: Dimensions.get('screen').width - 40,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.BLUE_GREY,
          flexDirection: 'row',
          borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
          padding: 10,
          flexGrow: 1,
        }}
      >
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
          <DeleteIconComponent />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextWrapperComponent style={style.dataText}>
            {reps || '-'}
          </TextWrapperComponent>
          <TextWrapperComponent style={style.text}>reps</TextWrapperComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextWrapperComponent style={style.dataText}>
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
          <TextWrapperComponent style={style.dataText}>
            {duration.minutes || '00'}
          </TextWrapperComponent>
          <TextWrapperComponent style={{ padding: 3 }}>:</TextWrapperComponent>
          <TextWrapperComponent style={[style.dataText]}>
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
            margin: 5,
          }}
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
