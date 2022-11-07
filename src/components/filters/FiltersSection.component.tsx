import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../theme';
import FiltersList from './FiltersList.component';
type Props = {
  title: string;
  list: string[];
};
const FiltersSection: FC<Props> = ({ title, list }) => {
  return (
    <View style={[style.itemContainer]}>
      <Text style={[style.title]}>{title}</Text>

      <FiltersList list={list} />
    </View>
  );
};
const style = StyleSheet.create({
  itemContainer: {
    padding: 5,
  },
  section: { flexDirection: 'row', flexWrap: 'wrap' },
  title: { color: COLORS.WHITE, padding: 10, fontSize: 20 },
});
export default FiltersSection;
