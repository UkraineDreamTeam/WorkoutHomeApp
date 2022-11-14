import React from 'react';
import { StyleSheet, View } from 'react-native';
import Filter from '../../assets/icons/Filter.svg';
const FilterIcon = () => {
  return (
    <View style={style.filterIcon}>
      <Filter />
    </View>
  );
};
const style = StyleSheet.create({
  filterIcon: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
});
export default FilterIcon;
