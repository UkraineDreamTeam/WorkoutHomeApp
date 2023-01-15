import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import { WeigthSelectorComponent } from '../../selectors/WeigthSelector.component';

type Props = {
  values?: {
    reps: 1;
    weight: 0;
  };
};

export const WeightSelectorsGroupComponent = () => {
  const [value, setValue] = useState('1');

  const handleTextChange = (text: string) => {
    setValue(!text ? '' : text.replace(/[^0-9]/gi, '').toString());
  };
  return (
    <View style={styles.container}>
      <View style={styles.repsContainer}>
        <Text style={[styles.text]}>Reps:</Text>
        <TextInput
          value={value.toString()}
          keyboardType="numeric"
          style={styles.repsInput}
          maxLength={3}
          onChangeText={handleTextChange}
          onFocus={() => setValue(value || '')}
          onBlur={() => {
            setValue(
              ('00' + value).slice(value.length > 2 ? -value.length : -2)
            );
          }}
        />
      </View>

      <View style={styles.repsContainer}>
        <Text style={[styles.text, styles.weight]}>Weight:</Text>
        <WeigthSelectorComponent />

        <Text style={styles.text}>kg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    backgroundColor: 'white',
    padding: 0,
    alignSelf: 'flex-end',
    height: 4,
    width: 4,
    margin: 3,
    borderRadius: 2,
  },
  text: {
    fontSize: 14,
    color: COLORS.WHITE,
    alignSelf: 'center',
    padding: 6,
  },
  weight: {
    marginLeft: 10,
  },
  repsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: { color: COLORS.WHITE, fontSize: 20 },
  repsInput: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
  },
});
