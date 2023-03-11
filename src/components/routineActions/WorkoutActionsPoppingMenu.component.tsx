import React, { Dispatch, useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLOR_SCHEME, WORKOUT_ACTIONS_LAYOUT } from '@shared/theme';
import DotsWhite from '@assets/icons/DotsWhite.svg';
import RoutineActions from 'components/routineActions/WorkoutActionsFromPoppingMenu.component';

const WorkoutActionsPoppingMenu = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const workoutActionsAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useCallback(() => {
    Animated.timing(workoutActionsAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [workoutActionsAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(workoutActionsAnim, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [workoutActionsAnim]);

  const menuBorders = {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: workoutActionsAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [0, 5, 10],
    }),
    borderTopLeftRadius: workoutActionsAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [0, 5, 10],
    }),
  };

  const opacity = {
    opacity: workoutActionsAnim.interpolate({
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

  const handleVisibility = () => setModalVisible(!modalVisible);

  return (
    <View style={[styles.centeredView]}>
      <View style={[styles.centeredView, styles.menu]}>
        <Animated.View
          style={[
            styles.modalView,
            { ...menuBorders },
            {
              transform: [
                {
                  translateY: workoutActionsAnim.interpolate({
                    inputRange: [0, 10, 20],
                    outputRange: [Dimensions.get('screen').height, 20, 0],
                  }),
                },
              ],
            },
            { ...opacity },
          ]}
        >
          <RoutineActions handleVisibility={handleVisibility} />
        </Animated.View>
      </View>

      <TouchableOpacity
        onPress={handleVisibility}
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
    backgroundColor: COLOR_SCHEME.WORKOUT_ACTIONS,
    width: WORKOUT_ACTIONS_LAYOUT.WIDTH,
    alignItems: 'center',
  },
});

export default WorkoutActionsPoppingMenu;
