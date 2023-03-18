import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import { WeightSelectorComponent } from '../../selectors/WeightSelectorComponent';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { RepsSelectorComponent } from 'components/exerciseScreen/exerciseSetForm/selectors/RepsInput.component';

export const WeightRepsSelectorsGroupComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.repsContainer}>
        <TextWrapperComponent style={[styles.text]}>Reps:</TextWrapperComponent>
        <RepsSelectorComponent />
      </View>
      <View style={styles.repsContainer}>
        <TextWrapperComponent style={[styles.text, styles.weight]}>
          Weight:
        </TextWrapperComponent>
        <WeightSelectorComponent />

        <TextWrapperComponent style={styles.text}>kg</TextWrapperComponent>
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
    fontFamily: TYPOGRAPHY.FONTS.medium,
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
    height: 40,
    width: 40,
    backgroundColor: 'black',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
  },
});
