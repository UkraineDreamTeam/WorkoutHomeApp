import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@shared/theme';
import { MinutesSelector } from '../../selectors/MinutesSelector.component';
import { SecondsSelector } from '../../selectors/SecondsSelector.component';

export const TimeSelector = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>Duration:</Text>
      <View style={styles.timeContainer}>
        <MinutesSelector />
        <Text style={styles.timeDots}>:</Text>
        <SecondsSelector />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  timeDots: { fontSize: 32, color: COLORS.WHITE },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
    alignSelf: 'center',
    textAlignVertical: 'center',
    height: 50,
  },
});
