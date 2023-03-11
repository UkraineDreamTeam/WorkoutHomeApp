import React, { FC, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { deleteRoutine } from 'redux/exercises/thunks/workoutPlan.thunk';
import { selectedPlan, selectedRoutine } from 'redux/exercises/exercises.slice';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { RoutineControlButton } from 'components/routineActions/routineControl/RoutineControlButton.component';
import { ROUTINE_ACTION_TYPE } from 'shared/constants/constants';

type Props = {
  handleVisibility: () => void;
  action: ROUTINE_ACTION_TYPE;
};

const AreYouSureModal: FC<Props> = ({ handleVisibility, action }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const selected = useAppSelector(selectedPlan);
  const routine = useAppSelector(selectedRoutine);
  const handleSubmit = () => {
    if (routine?.id && selected?.id) {
      void dispatch(
        deleteRoutine({ planId: selected.id, routineId: routine.id })
      );
      setModalVisible(false);
    }
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  const handleBackgroundTouch = () => {
    setModalVisible(false);
  };

  const modalOpen = () => {
    handleVisibility();
    setModalVisible(true);
  };

  return (
    <View style={[styles.modalContainer]}>
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
            <TextWrapperComponent
              style={[{ fontSize: 16, color: COLORS.WHITE }]}
            >
              Are you sure you want to delete routine {routine?.name} ?
            </TextWrapperComponent>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={handleClose}
              >
                <TextWrapperComponent style={styles.text}>
                  No
                </TextWrapperComponent>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDone]}
                onPress={handleSubmit}
              >
                <TextWrapperComponent style={styles.text}>
                  Yes
                </TextWrapperComponent>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <RoutineControlButton setModalVisible={modalOpen} action={action} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  buttonOpen: {
    height: 40,
    borderTopLeftRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    borderBottomLeftRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    backgroundColor: COLORS.PINK,
    marginVertical: 5,
    width: 100,
  },
  textStyle: {
    color: COLORS.WHITE,
    fontSize: 12,

    fontWeight: '600',
  },
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

export default AreYouSureModal;
