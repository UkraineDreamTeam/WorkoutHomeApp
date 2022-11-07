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
import SearchIcon from '../icons/SearchIcon.component';
import FilterIcon from '../icons/Filter.component';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';

type Props = {
  text: string;
  onChangeText: Dispatch<React.SetStateAction<string>>;
};
const SearchInput: FC<Props> = ({ onChangeText, text }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
        onPress={() => navigation.navigate('Filters')}
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            // marginHorizontal: 20,
            maxWidth: Dimensions.get('screen').width / 3,
            // backgroundColor: COLORS.PINK,
            borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
            // paddingHorizontal: 20,
            // marginVertical: 10,
            alignSelf: 'center',
            // borderWidth: 1,
            // padding: 5,
            // borderColor: COLORS.WHITE,
            // backgroundColor: COLORS.PINK,
            // position: 'absolute',
          },
        ]}
      >
        <FilterIcon />
        {/* <Text
          style={[
            {
              // fontWeight: '400',
              fontSize: 14,
              alignSelf: 'center',
              marginLeft: 20,
              color: COLORS.WHITE,
            },
          ]}
        >
          FILTERS
        </Text> */}
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
  },
  header: { display: 'flex', flexDirection: 'row', marginTop: 12 },
});
export default SearchInput;
