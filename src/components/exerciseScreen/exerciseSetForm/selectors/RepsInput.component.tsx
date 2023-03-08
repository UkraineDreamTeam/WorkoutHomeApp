import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { TYPOGRAPHY } from 'shared/theme';
import TextInputWrapperComponent from 'shared/wrapperComponents/TextInputWrapper.component';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { form, setReps } from 'redux/workoutForm/workoutForm.slice';

type ChangeEvent = { nativeEvent: { text: string } };
export const RepsSelectorComponent = () => {
  const dispatch = useAppDispatch();
  const workoutForm = useAppSelector(form);
  const [value, setValue] = useState("");

  const [error, setError] = useState(false);
  const handleChange = (e: ChangeEvent) => {
    if (
      !e.nativeEvent.text.match(/[^0-9]/gi) &&
      Number(e.nativeEvent.text) < 100
    ) {
      setValue(e.nativeEvent.text);
      setError(false);
    } else {
      setValue(e.nativeEvent.text);
      setError(true);
    }
  };
  const setRepOnBlur = () => {
    if (!error) {
      dispatch(setReps(Number(value)));
    }
    if (error) {
      setValue(workoutForm.reps.toString());
      setError(false);
    }
  };
  useEffect(() => {

    setValue(workoutForm.reps.toString());
  }, []);
  return (
    <View style={[styles.container]}>
      <TextInputWrapperComponent
        value={value.toString()}
        keyboardType="numeric"
        style={[
          {
            borderColor: error ? 'red' : 'transparent',
            borderWidth: error ? 1 : 0,
            height: 40,
            width: 80,
            backgroundColor: 'black',
            borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
            textAlign: 'center',
            fontFamily: TYPOGRAPHY.FONTS.medium
          },
        ]}
        onChange={handleChange}
        onBlur={setRepOnBlur}
      />
    </View>
  );
};
