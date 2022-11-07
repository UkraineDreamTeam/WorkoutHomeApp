import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Back from '../../assets/icons/BackArrow.svg';
import { HomeTabParamList } from '../../types/types';
const BackIcon = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
  return (
    <TouchableOpacity
      style={[
        {
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
          //   padding: 20,
        },
      ]}
      onPress={() => navigation.goBack()}
    >
      <Back />
    </TouchableOpacity>
  );
};

export default BackIcon;
