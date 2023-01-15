import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';
type ChangeEvent = { nativeEvent: { text: string } };
export const SecondsSelector = () => {
  const [value, setValue] = useState('00');
  const inputRef = useRef<TextInput>(null);
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
  return (
    <View style={[styles.container]}>
      <TextInput
        ref={inputRef}
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
