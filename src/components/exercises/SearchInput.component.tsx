import React, { Dispatch, FC } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { COLOR_SCHEME, TYPOGRAPHY } from '../../theme';
import BackIcon from '../icons/BackIcon.component';
import SearchIcon from '../icons/SearchIcon.component';
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    flexGrow: 1,
    width: Dimensions.get('screen').width - 96,
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: COLOR_SCHEME.CARD_COLOR,
    paddingLeft: 40,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
  },
  header: { display: 'flex', flexDirection: 'row' },
});
export default SearchInput;
