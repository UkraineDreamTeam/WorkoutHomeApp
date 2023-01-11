import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Filter } from '@redux/types';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import FiltersList from './FiltersList.component';
type Props = {
  list: Filter[];
  name: 'bodyPart' | 'type' | 'target' | 'equipment';
};
const FiltersSection: FC<Props> = ({ list, name }) => {
  return (
    <View style={[styles.itemContainer]}>
      <FiltersList list={list} name={name} />
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    flexShrink: 1,
    backgroundColor: 'black',
    flexDirection: 'column',

    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    // width: Dimensions.get('screen').width - 80,
  },
  section: { flexDirection: 'row', flexWrap: 'wrap' },
  title: { color: COLORS.WHITE, padding: 10, fontSize: 20 },
});
export default FiltersSection;
