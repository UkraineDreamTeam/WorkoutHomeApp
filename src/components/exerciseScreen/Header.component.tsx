import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import BackIcon from '../icons/BackIcon.component';
import DeleteIcon from '../icons/DeleteIcon.component';
import DoneIcon from '../icons/DoneIcon.component';

const Header = () => {
  return (
    <SafeAreaView style={style.headerContainer}>
      <BackIcon />
      <View style={style.buttonsContainer}>
        <TouchableOpacity style={[style.button, style.buttonDelete]}>
          <DeleteIcon />
          <Text style={style.text}> Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.button, style.buttonDone]}>
          <DoneIcon />
          <Text style={style.text}> Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  button: {
    width: 90,
    height: 40,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    flexDirection: 'row',
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignContent: 'center',
    justifyItems: 'center',
  },
  buttonDelete: {
    backgroundColor: COLORS.BLACK,
    marginRight: 15,
  },
  buttonDone: {
    backgroundColor: COLORS.PINK,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 0,
    fontSize: 14,
    alignSelf: 'center',
    justifySelf: 'flex-start',
  },
});

export default Header;
