import React, { FC } from 'react';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { WorkoutForm } from 'redux/workoutForm/types';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY } from 'shared/theme';

import DeleteIconComponent from 'components/icons/DeleteIcon.component';
import { useAppDispatch } from 'redux/store';
import { deleteSet } from 'redux/workoutForm/workoutForm.slice';

const SetItem: FC<{ data: WorkoutForm }> = ({
  data: { sets, reps, duration, weight, id },
}) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <View style={style.setItemContainer}>
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
            {duration.minutes} min. {duration.seconds} sec.
          </TextWrapperComponent>
        ) : null}
        <TouchableOpacity
          style={style.setItemDeleteButton}
          onPress={() => dispatch(deleteSet(id))}
        >
          <DeleteIconComponent />
        </TouchableOpacity>
      </View>
    </>
  );
};
const style = StyleSheet.create({
  text: {
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
    paddingHorizontal: 5,
    fontFamily: TYPOGRAPHY.FONTS.regular,
  },
  setItemContainer: {
    backgroundColor: COLORS.BLUE_GREY,
    flexDirection: 'row',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexGrow: 1,
    paddingVertical: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  setItemDeleteButton: {
    alignContent: 'center',
    alignItems: 'center',

    width: 30,
    height: 30,
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
export default SetItem;
