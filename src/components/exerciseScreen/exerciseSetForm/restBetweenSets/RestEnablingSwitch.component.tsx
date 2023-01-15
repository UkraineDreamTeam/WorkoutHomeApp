import React, { FC } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { COLORS } from '@shared/theme';

type Props = {
  isEnabled: boolean;
  toggleSwitch: () => void;
};

const RestBetweenSetsSwitch: FC<Props> = ({ isEnabled, toggleSwitch }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>Rest between sets:</Text>
      <Switch
        trackColor={{ false: COLORS.BLOCK_GREY, true: COLORS.PINK }}
        thumbColor={isEnabled ? COLORS.GREY : COLORS.LIGHT_GREY}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
  },
  title: { fontSize: 16, color: COLORS.WHITE },
});

export default RestBetweenSetsSwitch;
