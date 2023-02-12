import React, { FC, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS, TYPOGRAPHY } from '@shared/theme';
import AddPhotoIcon from '@icons-components/AddPhotoIcon';
import { WeightRepsSelectorsGroupComponent } from './weightRepsSelectorsGroup/WeightRepsSelectorsGroup.component';
import SetsCountComponent from './setsCount/SetsCount.component';
import { TimeSelector } from 'components/exerciseScreen/exerciseSetForm/sets/timeSelectorsGroup/TimeSelector.component';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { addForm, form, sets } from 'redux/workoutForm/workoutForm.slice';
import { nanoid } from '@reduxjs/toolkit';

export const CreateSetModal: FC = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector(sets);
  const currentForm = useAppSelector(form);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    setModalVisible(!modalVisible);
    dispatch(addForm({ ...currentForm, id: nanoid() }));
  };
  const handleDismiss = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleDismiss}
        >
          <View style={styles.modal}>
            <Pressable style={styles.touchableBackground} />
            <View style={styles.modalContent}>
              <View
                style={[
                  {
                    flexDirection: 'column',
                    height: 150,
                  },
                ]}
              >
                <WeightRepsSelectorsGroupComponent />
                <TimeSelector />
              </View>
              <SetsCountComponent />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonDelete]}
                  onPress={handleSubmit}
                >
                  <TextWrapperComponent style={styles.text}>
                    Cancel
                  </TextWrapperComponent>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonDone]}
                  onPress={handleSubmit}
                >
                  <TextWrapperComponent style={styles.text}>
                    Done
                  </TextWrapperComponent>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.addSetButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <AddPhotoIcon />
          <TextWrapperComponent style={{ color: COLORS.WHITE }}>
            Add different set
          </TextWrapperComponent>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    padding: 10,
    paddingTop: 160,
  },
  modalContent: {
    flexDirection: 'column',
    backgroundColor: COLORS.BLOCK_GREY,
    width: Dimensions.get('screen').width - 20,
    height: 300,
    padding: 20,
    justifyItems: 'center',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
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
