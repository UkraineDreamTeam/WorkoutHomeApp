import React, { FC, useEffect, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS, TYPOGRAPHY } from '@shared/theme';
import AddPhotoIcon from '@icons-components/AddPhotoIcon';
import { WeightSelectorsGroupComponent } from './weightSelectorsGroup/WeightSelectorsGroup.component';
import SetsCountComponent from './setsCount/SetsCount.component';
import { TimeSelector } from 'components/exerciseScreen/exerciseSetForm/sets/timeSelectorsGroup/TimeSelector.component';

type FormValues = {
  time: number;
  weight: number;
  reps: number;
  sets: number;
};
// TODO  Create form and save values
export const CreateSetModal: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    time: 0,
    reps: 1,
    sets: 1,
    weight: 0,
  });

  const handleSubmit = () => {
    setModalVisible(!modalVisible);
  };
  const handleDismiss = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {});
  }, []);
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
                <WeightSelectorsGroupComponent />
                <TimeSelector />
              </View>
              <SetsCountComponent />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonDelete]}
                  onPress={handleSubmit}
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
