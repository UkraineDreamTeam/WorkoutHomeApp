import React, { Dispatch, FC } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Filter } from '../../redux/exercises/types';
import { COLORS, TYPOGRAPHY } from '../../theme';
import FiltersList from './FiltersList.component';
type Props = {
  list: Filter[];
  name: 'bodyPart' | 'type' | 'target' | 'equipment';
  hide: Dispatch<
    React.SetStateAction<'bodyPart' | 'type' | 'target' | 'equipment' | null>
  >;
};
const FiltersSection: FC<Props> = ({ list, name, hide }) => {
  return (
    <View style={[style.itemContainer]}>
      <Pressable
        onPress={() => {
          hide(null);
          console.log('hi');
        }}
        style={{
          alignSelf: 'flex-start',
          borderColor: COLORS.WHITE,
          // borderBottomWidth: 1,
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <Text
          style={[
            {
              color: COLORS.WHITE,

              textAlign: 'center',
              paddingHorizontal: 10,
              width: 100,
            },
          ]}
        >
          Hide filters
        </Text>
      </Pressable>
      <FiltersList list={list} name={name} />
    </View>
  );
};
const style = StyleSheet.create({
  itemContainer: {
    padding: 5,
    flexShrink: 1,
    backgroundColor: 'black',
    flexDirection: 'column',

    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    width: Dimensions.get('screen').width - 80,
  },
  section: { flexDirection: 'row', flexWrap: 'wrap' },
  title: { color: COLORS.WHITE, padding: 10, fontSize: 20 },
});
export default FiltersSection;
