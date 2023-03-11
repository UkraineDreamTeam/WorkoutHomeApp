import React, { FC } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { addExtraImage } from '@redux/exercises/thunks/exrcises.thunk';
import { useAppDispatch } from '@redux/store';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import AddPhotoIcon from '@icons-components/AddPhotoIcon';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';

const AddPhoto: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={() => dispatch(addExtraImage(id))}
    >
      <View style={[styles.container]}>
        <AddPhotoIcon />
        <TextWrapperComponent style={[styles.text]}>
          Add photo
        </TextWrapperComponent>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
    fontFamily: TYPOGRAPHY.FONTS.semibold,
    color: COLORS.WHITE,
    paddingLeft: 5
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    // width: Dimensions.get('screen').width * 0.25,
    alignContent: 'stretch',

  },
});

export default AddPhoto;
