import React, { useState } from 'react';

import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch } from 'redux/store';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { COLORS, TYPOGRAPHY, WORKOUT_ACTIONS_LAYOUT } from 'shared/theme';
import Start from 'assets/icons/Start.svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'shared/types/types';
import { TimeItem as RestTimeItem } from 'components/exerciseScreen/exerciseSetForm/selectors/TimeItem.component';

const StartWorkoutModal = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const [seconds, setSeconds] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');
  const [errorSeconds, setErrorSeconds] = useState(false);
  const [errorMinutes, setErrorMinutes] = useState(false);

  const handleSubmit = () => {
    setModalVisible(false);
    navigation.navigate('WorkoutInProgress', {
      restTime: (Number(seconds) + Number(minutes) * 60) * 1000,
    });
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  const handleBackgroundTouch = () => {
    setModalVisible(false);
  };

  const modalOpen = () => {
    setModalVisible(true);
  };

  const setRestTimeBetweenSets = () => {};
  return (
    <View>
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
              style={{
                fontFamily: TYPOGRAPHY.FONTS.semibold,
                paddingVertical: 12,
              }}
            >
              Set rest between exercises
            </TextWrapperComponent>
            <View style={styles.timeContainer}>
              <RestTimeItem
                value={minutes}
                setValue={setMinutes}
                name={'minutes'}
                error={errorMinutes}
                setError={setErrorMinutes}
                setTimeOnBlur={setRestTimeBetweenSets}
                setModal={false}
              />
              <TextWrapperComponent style={styles.timeDots}>
                min.
              </TextWrapperComponent>
              <RestTimeItem
                value={seconds}
                setValue={setSeconds}
                name={'seconds'}
                error={errorSeconds}
                setError={setErrorSeconds}
                setTimeOnBlur={setRestTimeBetweenSets}
                setModal={false}
              />
              <TextWrapperComponent style={styles.timeDots}>
                sec.
              </TextWrapperComponent>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={handleClose}
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
                  Start
                </TextWrapperComponent>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={[styles.buttonOpen]} onPress={modalOpen}>
        <Start {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  buttonOpen: {
    paddingHorizontal: WORKOUT_ACTIONS_LAYOUT.getPadding(),
    paddingVertical: 20,
  },
  textStyle: {
    color: COLORS.WHITE,
    fontSize: 12,

    fontWeight: '600',
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
  container: {
    height: 250,
    backgroundColor: COLORS.BLACK,
    alignSelf: 'center',
    padding: 20,
    top: Dimensions.get('screen').height * 0.25,
    width: Dimensions.get('screen').width * 0.7,
    alignItems: 'center',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
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

  buttonDelete: {
    backgroundColor: COLORS.GREY,
    marginRight: 15,
  },
  buttonDone: {
    backgroundColor: COLORS.PINK,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',

    flex: 1,
    alignItems: 'center',
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

  timeDots: {
    fontSize: 15,
    color: COLORS.WHITE,
    alignSelf: 'center',
    marginHorizontal: 5,
    fontFamily: TYPOGRAPHY.FONTS.medium,
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: COLORS.BLOCK_GREY,
    padding: 15,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
  },
});

export default StartWorkoutModal;
