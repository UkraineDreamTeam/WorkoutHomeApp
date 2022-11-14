import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-svg';
import BackIcon from '../icons/BackIcon.component';
import DeleteIcon from '../icons/DeleteIcon.component';
import DoneIcon from '../icons/DoneIcon.component';

const Header = () => {
  return (
    <SafeAreaView style={style.headerContainer}>
      <BackIcon />
      <View>
        <TouchableOpacity>
          <DeleteIcon />
          <Text> Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <DoneIcon />
          <Text> Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Header;
