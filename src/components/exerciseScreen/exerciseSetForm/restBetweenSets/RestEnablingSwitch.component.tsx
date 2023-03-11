import React, { FC } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';

type Props = {
  isEnabled: boolean;
  toggleSwitch: () => void;
};

const RestBetweenSetsSwitch: FC<Props> = ({ isEnabled, toggleSwitch }) => {
  return (
    <View style={styles.container}>
      <TextWrapperComponent style={[styles.title]}>
        Rest between sets:
      </TextWrapperComponent>
      <Switch
        trackColor={{ false: COLORS.BLOCK_GREY, true: COLORS.PINK }}
        thumbColor={isEnabled ? COLORS.GREY : COLORS.LIGHT_GREY}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontFamily: TYPOGRAPHY.FONTS.semibold,
  },
});

export default RestBetweenSetsSwitch;
