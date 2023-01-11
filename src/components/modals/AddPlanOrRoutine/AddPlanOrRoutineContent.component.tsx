import React, { Dispatch, FC, RefObject } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';

type Props = {
  modalVisible: boolean;
  setModalVisible: Dispatch<boolean>;
  handleBackgroundTouch: () => void;
  inputRef: RefObject<TextInput>;
  title: string;
  error: string;
  setName: Dispatch<string>;
  handleSubmit: () => void;
  handleClose: () => void;
};
const AddPlanOrRoutineContent: FC<Props> = ({
  modalVisible,
  setModalVisible,
  handleBackgroundTouch,
  inputRef,
  title,
  error,
  setName,
  handleSubmit,
  handleClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[{ alignItems: 'center' }]}>
        <Pressable
          style={styles.touchableBackground}
          onPress={handleBackgroundTouch}
        />
        <View style={[styles.container]}>
          <Text style={[{ fontSize: 20, color: COLORS.WHITE }]}>{title}</Text>
          <TextInput
            ref={inputRef}
            style={[
              styles.nameInput,
              error ? styles.errorBorder : styles.border,
            ]}
            onChangeText={setName}
          />
          {error ? <Text>{error}</Text> : null}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonDelete]}
              onPress={handleClose}
            >
              <Text style={styles.text}> Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonDone]}
              onPress={handleSubmit}
            >
              <Text style={styles.text}> Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: COLORS.BLACK,
    alignSelf: 'center',
    padding: 20,
    top: Dimensions.get('screen').height * 0.25,
    width: Dimensions.get('screen').width * 0.7,
  },
  nameInput: {
    height: 60,
    color: COLORS.WHITE,
  },
  errorInfo: {
    height: 60,
    fontSize: 12,
    color: COLORS.RED,
  },
  border: { borderColor: COLORS.PINK, borderBottomWidth: 1 },
  errorBorder: {
    borderColor: COLORS.RED,
    borderBottomWidth: 2,
  },
  buttonOpen: {
    height: 60,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    backgroundColor: COLORS.BLOCK_GREY,
  },
  textStyle: {
    color: COLORS.PINK,
    fontSize: 20,
    padding: 10,
    fontWeight: '600',
  },

  touchableBackground: {
    position: 'absolute',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: COLORS.BLACK,
    opacity: 0.6,
  },

  addSetButton: {
    width: Dimensions.get('screen').width * 0.8,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.BLOCK_GREY,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
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
    backgroundColor: COLORS.GREY,
    marginRight: 15,
  },
  buttonDone: {
    backgroundColor: COLORS.PINK,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',

    flex: 1,
    alignItems: 'flex-end',
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
export default AddPlanOrRoutineContent;
