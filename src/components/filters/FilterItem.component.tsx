import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { filter } from '../../redux/exercises/actions';
import { Filter, FilterNames } from '../../redux/exercises/types';
import { useAppDispatch } from '../../redux/store';
import { COLORS, COLOR_SCHEME, TYPOGRAPHY } from '../../theme';
type Props = {
  text: string;
  selected: boolean;
  isSelectable: boolean;
  name: FilterNames;
};
const FilterItem: FC<Props> = item => {
  const { text, selected, isSelectable, name } = item;
  const dispatch = useAppDispatch();

  const onSelect = (option: Filter) => {
    dispatch(filter({ name: name, filterItem: option }));
  };
  return (
    <TouchableOpacity
      style={[style.itemContainer]}
      onPress={() => onSelect({ value: text, selected, isSelectable })}
      disabled={!isSelectable}
    >
      <View
        style={[
          style.item,
          {
            backgroundColor: selected
              ? COLOR_SCHEME.ANOTHER_ACTIONS
              : 'transparent',

            borderColor: isSelectable
              ? COLOR_SCHEME.ANOTHER_ACTIONS
              : COLORS.GREY,
          },
        ]}
      >
        <Text style={{ color: selected ? COLORS.BLACK : COLORS.WHITE }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  item: {
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    borderWidth: 2,
    padding: 10,
  },
  itemContainer: {
    padding: 5,
  },
});
export default FilterItem;
