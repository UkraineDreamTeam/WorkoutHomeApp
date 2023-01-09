import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Trash from '@assets/icons/Trash.svg';
const DeleteIcon: FC<{ height?: number }> = ({ height }) => {
  return (
    <View style={styles.iconContainer}>
      <Trash
        height={height || 15}
        width={height || 15}
        style={{ position: undefined }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 40,
    alignSelf: 'flex-end',
    paddingBottom: 12,
  },
});

export default DeleteIcon;
