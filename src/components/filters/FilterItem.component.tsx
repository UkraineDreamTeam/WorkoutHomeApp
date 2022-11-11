import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, COLOR_SCHEME, TYPOGRAPHY } from '../../theme';
type Props = {
  text: string;
  selected: boolean;
  isSelectable: boolean;
};
const FilterItem: FC<Props> = ({ text, selected, isSelectable }) => {
  // const itemStyle = {
  //   backgroundColor: selected ? COLORS.PINK : 'transparent',
  // };
  // useEffect(() => {
  //   console.log(selected);
  // });
  return (
    <View
      style={[
        style.item,
        {
          backgroundColor: selected
            ? COLOR_SCHEME.ANOTHER_ACTIONS
            : isSelectable
            ? 'none'
            : 'grey',
        },
      ]}
    >
      <Text style={{ color: selected ? COLORS.BLACK : COLORS.WHITE }}>
        {text}
      </Text>
    </View>
  );
};
const style = StyleSheet.create({
  item: {
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,

    borderColor: COLOR_SCHEME.ANOTHER_ACTIONS,
    borderWidth: 2,

    padding: 10,
  },
});
export default FilterItem;
