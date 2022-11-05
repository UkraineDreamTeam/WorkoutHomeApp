import React, { Dispatch, useCallback, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import { COLOR_SCHEME, WORKOUT_ACTIONS_LAYOUT } from '../theme';
import Edit from '../assets/icons/Edit.svg';
import DotsWhite from '../assets/icons/DotsWhite.svg';
import Reorder from '../assets/icons/Reorder.svg';
import Rename from '../assets/icons/Rename.svg';
import Delete from '../assets/icons/Delete.svg';

const WorkoutActionsPoppingMenu = ({
  modalVisible,
  setModalVisible,
}: // menuBorders,
{
  modalVisible: boolean;

  setModalVisible: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const menuAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useCallback(() => {
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(menuAnim, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuAnim]);

  const menuBorders = {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [0, 5, 10],
    }),
    borderTopLeftRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [0, 5, 10],
    }),
  };

  const opacity = {
    opacity: menuAnim.interpolate({
      inputRange: [0, 16, 20],
      outputRange: [0, 0.8, 1],
    }),
  };
  useEffect(() => {
    if (modalVisible) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [setModalVisible, modalVisible, fadeIn, fadeOut]);
  return (
    <View style={[styles.centeredView]}>
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible}> */}

      <View style={[styles.centeredView, styles.menu]}>
        <Animated.View
          style={[
            styles.modalView,
            { ...menuBorders },
            {
              transform: [
                {
                  translateY: menuAnim.interpolate({
                    inputRange: [0, 10, 20],
                    outputRange: [Dimensions.get('screen').height, 20, 0],
                  }),
                },
              ],
            },
            { ...opacity },
          ]}
        >
          <Pressable
            style={[styles.button]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Edit {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
            <Text>Edit Superset</Text>
          </Pressable>
          <Pressable
            style={[styles.button]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Reorder {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
            <Text>Reorder exercises</Text>
          </Pressable>
          <Pressable
            style={[styles.button]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Rename {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
            <Text>Rename routine</Text>
          </Pressable>
          <Pressable
            style={[styles.button]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Delete {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
            <Text>Delete routine</Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* </Modal> */}
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          paddingHorizontal: WORKOUT_ACTIONS_LAYOUT.getPadding(),
          paddingVertical: 20,
        }}
      >
        <DotsWhite {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
  },
  menu: {
    bottom: 60,
    justifyContent: 'flex-end',
    right: 0,
  },
  modalView: {
    // marginBottom: 133,
    backgroundColor: COLOR_SCHEME.WORKOUT_ACTIONS,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // alignItems: 'center',
    width: WORKOUT_ACTIONS_LAYOUT.WIDTH,
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: WORKOUT_ACTIONS_LAYOUT.getPadding(),
    paddingVertical: 10,
    alignItems: 'center',
    width: WORKOUT_ACTIONS_LAYOUT.WIDTH,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default WorkoutActionsPoppingMenu;
