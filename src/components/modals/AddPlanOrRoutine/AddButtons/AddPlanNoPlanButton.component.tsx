import React, { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import TextWrapperComponent from "shared/wrapperComponents/TextWrapper.component";

const AddPlanNoPlanButtonComponent: FC<{
  handleOpen: () => void;
}> = ({ handleOpen }) => {
  return (
    <Pressable onPress={handleOpen} style={styles.buttonOpen}>
      <TextWrapperComponent style={styles.textStyle}>Create workout plan</TextWrapperComponent>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  buttonOpen: {
    height: 60,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    backgroundColor: COLORS.BLOCK_GREY,
  },
  textStyle: {
    color: COLORS.PINK,
    fontSize: 20,
    padding: 10,
    fontWeight: '600',
  },
});
export default AddPlanNoPlanButtonComponent;
