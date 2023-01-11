import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Back from '@assets/icons/BackArrow.svg';
import { HomeTabParamList } from '@shared/types/types';

const BackIcon = () => {
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
  return (
    <TouchableOpacity
      style={[styles.backButton]}
      onPress={() => navigation.goBack()}
    >
      <Back />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    maxWidth: 50,
  },
});
export default BackIcon;
