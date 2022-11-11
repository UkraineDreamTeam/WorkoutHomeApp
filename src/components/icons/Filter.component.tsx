import React from 'react';
import { View } from 'react-native';
import Filter from '../../assets/icons/Filter.svg';
const NavIcon = () => {
  return (
    <View
      style={[
        {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 10,
        },
      ]}
    >
      <Filter />
    </View>
  );
};

export default NavIcon;
