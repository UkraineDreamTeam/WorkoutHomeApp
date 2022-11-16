import React from 'react';
import { StyleSheet, View } from 'react-native';
import Done from '../../assets/icons/CheckIcon.svg';
const DoneIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Done />
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 15,
    alignSelf: 'flex-end',
    paddingBottom: 12,
  },
});

export default DoneIcon;
