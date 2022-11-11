import React, { Dispatch, FC } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLOR_SCHEME, TYPOGRAPHY } from '../../theme';
import BackIcon from '../icons/BackIcon.component';
import FilterIcon from '../icons/Filter.component';
import SearchIcon from '../icons/SearchIcon.component';

type Props = {
  text: string;
  onChangeText: Dispatch<React.SetStateAction<string>>;
  showFilters: Dispatch<React.SetStateAction<boolean>>;
};
const SearchInput: FC<Props> = ({ onChangeText, text, showFilters }) => {
  return (
    <SafeAreaView style={[styles.header]}>
      <BackIcon />
      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={'Search by name or muscle'}
        />
        <SearchIcon />
      </View>
      <TouchableOpacity
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            maxWidth: Dimensions.get('screen').width / 3,
            borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,

            alignSelf: 'center',
          },
        ]}
        onPress={() => showFilters(true)}
      >
        <FilterIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    flexGrow: 1,
    width: Dimensions.get('screen').width - 146,
  },
  input: {
    height: 45,
    backgroundColor: COLOR_SCHEME.CARD_COLOR,
    paddingLeft: 40,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    marginRight: 10,
  },
  header: { display: 'flex', flexDirection: 'row', marginTop: 12 },
});
export default SearchInput;
