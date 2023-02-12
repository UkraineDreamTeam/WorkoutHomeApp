import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import TextInputWrapperComponent from 'shared/wrapperComponents/TextInputWrapper.component';
import { form, setSets } from 'redux/workoutForm/workoutForm.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';

type ChangeEvent = { nativeEvent: { text: string } };
const SetsCountComponent = () => {
  const dispatch = useAppDispatch();
  const workoutForm = useAppSelector(form);
  const [value, setValue] = useState('0');
  const inputRef = useRef<TextInput>(null);
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
  const setSetsOnBlur = () => {
    if (!error) {
      dispatch(setSets(Number(value)));
    }
    if (error) {
      setValue(workoutForm.sets.toString());
      setError(false);
    }
  };

  useEffect(() => {
    setValue(workoutForm.sets.toString());
  }, []);

  return (
    <View style={[styles.container]}>
      <TextWrapperComponent style={[styles.text]}>
        Repeat this set
      </TextWrapperComponent>
      <TextInputWrapperComponent
        inputRef={inputRef}
        value={value.toString()}
        keyboardType="numeric"
        style={[
          styles.textInput,
          {
            borderColor: error ? 'red' : 'transparent',
            borderWidth: error ? 1 : 0,
          },
        ]}
        onChange={handleChange}
        onBlur={setSetsOnBlur}
      />
      <TextWrapperComponent style={[styles.text]}>times</TextWrapperComponent>
    </View>
  );
};

export default SetsCountComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
  },
  text: {
    padding: 4,
    color: COLORS.WHITE,
    fontSize: 15,
  },
});
