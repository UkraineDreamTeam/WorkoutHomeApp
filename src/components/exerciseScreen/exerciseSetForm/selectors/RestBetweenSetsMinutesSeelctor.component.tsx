import React, { Dispatch, FC, useState } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';
type Props = {
  value: string;
  setValue: Dispatch<any>;
};

type ChangeEvent = { nativeEvent: { text: string } };
export const RestBetweenSetsMinutesSelector: FC<Props> = ({
  value,
  setValue,
}) => {
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
  return (
    <View style={[styles.container]}>
      <TextInput
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
        onBlur={e => setValue((value || '00').slice(-2))}
        maxLength={2}
      />
    </View>
  );
};
