import React, { FC } from 'react';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { WorkoutForm } from 'redux/workoutForm/types';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY } from 'shared/theme';

import DeleteIconComponent from 'components/icons/DeleteIcon.component';

const SetItem: FC<{ data: WorkoutForm }> = ({
  data: { sets, reps, duration, weight },
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        paddingVertical: 5,
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.BLUE_GREY,
          flexDirection: 'row',
          borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
          padding: 10,
          marginLeft: 10,
          flexGrow: 1,
        }}
      >
        <Image
          source={require('@assets/icons/PinkDot.png')}
          style={[{ alignSelf: 'center' }]}
        />
        {sets ? (
          <TextWrapperComponent style={style.text}>
            {sets} sets
          </TextWrapperComponent>
        ) : null}
        {reps ? (
          <TextWrapperComponent style={style.text}>
            {reps} reps
          </TextWrapperComponent>
        ) : null}
        {weight ? (
          <TextWrapperComponent style={style.text}>
            {weight} kg
          </TextWrapperComponent>
        ) : null}
        {duration ? (
          <TextWrapperComponent
            style={[style.text, { textAlign: 'right', flex: 1 }]}
          >
            {duration.minutes}min. {duration.seconds}sec.
          </TextWrapperComponent>
        ) : null}
      </View>
      <TouchableOpacity style={{ paddingHorizontal: 10 }}>
        <DeleteIconComponent />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  text: {
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});
export default SetItem;
