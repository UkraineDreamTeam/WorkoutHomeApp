import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';

type ChangeEvent = { nativeEvent: { text: string } };
const SetsCountComponent = () => {
  const [value, setValue] = useState(1);
  const inputRef = useRef<TextInput>(null);
  const handleChange = (e: ChangeEvent) => {
    if (!e.nativeEvent.text.match(/[^0-9]/gi)) {
      setValue(Number(e.nativeEvent.text));
    }
  };
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>Repeat this set</Text>
      <TextInput
        ref={inputRef}
        value={value.toString()}
        keyboardType="numeric"
        style={[styles.textInput]}
        onChange={handleChange}
      />
      <Text style={[styles.text]}>times</Text>
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
