import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Filter } from '../../redux/exercises/types';
import { COLORS } from '../../theme';
import FilterItem from './FilterItem.component';
type Props = {
  list: Filter[];
  name: 'bodyPart' | 'type' | 'target' | 'equipment';
};
const FiltersList: FC<Props> = ({ list }) => {
  // const dispatch = useAppDispatch();
  // const selected = useAppSelector(selectedFilters);
  // const onSelect = (option: string) =>
  //   dispatch(selectFilter({ filterName: name, values: option }));
  // useEffect(() => {
  //   console.log(list);
  // }, []);
  return (
    <View style={[style.section]}>
      {list.map(({ value, selected, isSelectable }) => (
        <TouchableOpacity
          key={value}
          style={[style.itemContainer]}
          disabled={!isSelectable}
        >
          <FilterItem
            text={value}
            selected={selected}
            isSelectable={isSelectable}
          />
        </TouchableOpacity>
      ))}
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
    // marginHorizontal: 50,
    // flex: 1,
    // height: Dimensions.get('screen').height * 0.4,
  },
  title: { color: COLORS.WHITE, padding: 10, fontSize: 20 },
});
export default FiltersList;
