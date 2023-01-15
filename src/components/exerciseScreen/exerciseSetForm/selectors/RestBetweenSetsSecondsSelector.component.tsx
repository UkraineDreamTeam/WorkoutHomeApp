import React, { Dispatch, FC, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  restTime,
  setRestBetweenSets,
} from 'redux/workoutForm/workoutForm.slice';
import { styles } from './styles';

type Props = {
  value: string | null;
  setValue: Dispatch<any>;
};
type ChangeEvent = { nativeEvent: { text: string } };

export const RestBetweenSetsSecondsSelector: FC<Props> = ({
  value,
  setValue,
}) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const handleChange = (e: ChangeEvent) => {
    if (
      !e.nativeEvent.text.match(/[^0-9]/gi) &&
      Number(e.nativeEvent.text) < 60
    ) {
      setValue(e.nativeEvent.text);
      setError(false);
    } else {
      setValue(e.nativeEvent.text);
      setError(true);
    }
  };
  const rest = useAppSelector(restTime);
  return (
    <View style={[styles.container]}>
      <TextInput
        value={value?.toString()}
        keyboardType="numeric"
        style={[
          styles.textInput,
          {
            borderColor: error ? 'red' : 'transparent',
            borderWidth: error ? 1 : 0,
          },
        ]}
        onChange={handleChange}
        onBlur={e => {
          if (value && !error) {
            dispatch(
              setRestBetweenSets({
                restTime: { seconds: (value || '00').slice(-2) },
              })
            );
            setValue((value || '00').slice(-2));
          }
          if (error) {
            setValue(rest.seconds);
            setError(false);
          }
        }}
        maxLength={2}
      />
    </View>
  );
};
