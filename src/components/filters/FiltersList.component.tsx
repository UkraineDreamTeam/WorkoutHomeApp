import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../theme';
import FilterItem from './FilterItem.component';
type Props = {
  list: string[];
};
const FiltersList: FC<Props> = ({ list }) => {
  return (
    <View style={[style.section]}>
      {list.map(target => (
        <View style={[style.itemContainer]}>
          <FilterItem key={target} text={target} />
        </View>
      ))}
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
export default FiltersList;
