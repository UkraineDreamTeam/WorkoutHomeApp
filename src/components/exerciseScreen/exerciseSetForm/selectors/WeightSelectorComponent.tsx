import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { styles } from './styles';
import { TYPOGRAPHY } from 'shared/theme';
import TextInputWrapperComponent from 'shared/wrapperComponents/TextInputWrapper.component';
import { form, setWeight } from 'redux/workoutForm/workoutForm.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';

type ChangeEvent = { nativeEvent: { text: string } };
export const WeightSelectorComponent = () => {
  const dispatch = useAppDispatch();
  const workoutForm = useAppSelector(form);
  const [value, setValue] = useState('0');

  const [error, setError] = useState(false);
  const handleChange = (e: ChangeEvent) => {
    if (!e.nativeEvent.text.match(/[^0-9.,]/gi)) {
      setValue(e.nativeEvent.text);
      setError(false);
    } else {
      setValue(e.nativeEvent.text);
      setError(true);
    }
  };

  const setWeightOnBlur = () => {
    Keyboard.dismiss();
    if (!error) {
      dispatch(setWeight(Number(value)));
      setValue(Number(value.replace(',', '.')).toString());
    }
    if (error) {
      setValue(workoutForm.weight.toString());
      setError(false);
    }
  };
  useEffect(() => {
    setValue(workoutForm.weight.toString());
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
            fontFamily: TYPOGRAPHY.FONTS.medium,
          },
        ]}
        onChange={handleChange}
        onBlur={setWeightOnBlur}
      />
    </View>
  );
};
