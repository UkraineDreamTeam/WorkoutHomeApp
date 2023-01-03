import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Filter, FilterNames } from '@redux/types';
import { COLORS } from '@shared/theme';
import FilterItem from './FilterItem.component';
type Props = {
  list: Filter[];
  name: FilterNames;
};
const FiltersList: FC<Props> = ({ list, name }) => {
  return (
    <View style={[style.section]}>
      {list.map(item => {
        const { value, selected, isSelectable } = item;
        return (
          <FilterItem
            key={value}
            text={value}
            selected={selected}
            isSelectable={isSelectable}
            name={name}
          />
        );
      })}
    </View>
  );
};
const style = StyleSheet.create({
  itemContainer: {
    padding: 5,
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,

    paddingBottom: 5,
  },
  title: { color: COLORS.WHITE, padding: 10, fontSize: 20 },
});
export default FiltersList;
