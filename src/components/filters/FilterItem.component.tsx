import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS, COLOR_SCHEME, TYPOGRAPHY } from '../../theme';
type Props = {
  text: string;
};
const FilterItem: FC<Props> = ({ text }) => {
  const [selected, setSelected] = useState(false);
  const itemStyle = {
    backgroundColor: selected ? COLORS.PINK : 'transparent',
  };

  return (
    <TouchableOpacity
      style={[style.item, itemStyle]}
      onPress={() => setSelected(!selected)}
    >
      <Text style={{ color: COLORS.WHITE }}>{text}</Text>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  item: {
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,

    backgroundColor: COLOR_SCHEME.ANOTHER_ACTIONS,
    borderColor: COLOR_SCHEME.ANOTHER_ACTIONS,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    padding: 5,
  },
});
export default FilterItem;
