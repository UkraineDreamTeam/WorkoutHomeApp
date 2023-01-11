import React, { Dispatch, FC } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { COLOR_SCHEME, TYPOGRAPHY } from '@shared/theme';
import FilterContainer from '../filters/FilterModal.component';
import BackIcon from '@icons-components/BackIcon.component';
import SearchIcon from '@icons-components/SearchIcon.component';

type Props = {
  text: string;
  onChangeText: Dispatch<React.SetStateAction<string>>;
};
const SearchInput: FC<Props> = ({ onChangeText, text }) => {
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

      <FilterContainer />
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
