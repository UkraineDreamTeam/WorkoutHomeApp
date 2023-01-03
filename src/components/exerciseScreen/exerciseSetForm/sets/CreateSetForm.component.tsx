import React, { FC, useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS, TYPOGRAPHY } from '@shared/theme';
import AddPhotoIcon from '../../../icons/AddPhotoIcon';
import { TimeSelector } from './timeSelectorsGroup/TimeSelector.component';
import { WeightSelectorsGroupComponent } from './weightSelectorsGroup/WeightSelectorsGroup.component';

export const CreateSetModal: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(1);
  const inputRef = useRef<TextInput>(null);
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <Pressable style={styles.touchableBackground} />

          <View style={styles.modalContent}>
            <View
              style={[
                {
                  flexDirection: 'column',
                  backgroundColor: 'blue',
                  height: 150,
                },
              ]}
            >
              <WeightSelectorsGroupComponent />
              <TimeSelector />
            </View>

            <TextInput
              ref={inputRef}
              value={value.toString()}
              keyboardType="numeric"
              style={{ backgroundColor: 'red', height: 60, width: 50 }}
              onChange={e => {
                if (!e.nativeEvent.text.match(/[^0-9]/gi)) {
                  setValue(Number(e.nativeEvent.text));
                }
              }}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.text}> Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDone]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.text}> Done</Text>
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
        <Text style={{ color: COLORS.WHITE }}> Add different set</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    height: Dimensions.get('screen').height * 0.33,
    padding: 20,
    justifyItems: 'center',
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
    padding: 10,
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
