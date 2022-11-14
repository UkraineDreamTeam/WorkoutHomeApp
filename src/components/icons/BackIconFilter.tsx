import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Back from '../../assets/icons/BackArrow.svg';
const BackIconFilter = ({ handleFilters }: { handleFilters: () => void }) => {
  return (
    <TouchableOpacity style={style.backButton} onPress={handleFilters}>
      <Back />
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  backButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    maxWidth: 50,
  },
});
export default BackIconFilter;
