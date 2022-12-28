import React, { FC } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { addExtraImage } from '../../redux/exercises/exrcises.thunk';
import { useAppDispatch } from '../../redux/store';
import { COLORS, TYPOGRAPHY } from '../../theme';
import AddPhotoIcon from '../icons/AddPhotoIcon';

const AddPhoto: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={[style.button]}
      onPress={() => dispatch(addExtraImage(id))}
    >
      <View style={[style.container]}>
        <AddPhotoIcon />
        <Text style={[style.text]}>Photo</Text>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  button: {
    backgroundColor: COLORS.BLACK,
    height: 50,
    width: Dimensions.get('screen').width - 20,
    marginHorizontal: 12,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.WHITE,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.25,
  },
});

export default AddPhoto;