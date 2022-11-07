import React from 'react';
import { View } from 'react-native';
import Search from '../../assets/icons/Search.svg';
const SearchIcon = () => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 20,
          left: 20,
        },
      ]}
    >
      <Search />
    </View>
  );
};

export default SearchIcon;
