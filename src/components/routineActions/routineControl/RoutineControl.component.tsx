import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import AddIconWhite from '@assets/icons/AddIconWhite.svg';

import {
  COLOR_SCHEME,
  TYPOGRAPHY,
  WORKOUT_ACTIONS_LAYOUT,
} from '@shared/theme';

import { RootStackParamList } from '@shared/types/types';

import WorkoutActionsPoppingMenu from '../WorkoutActionsPoppingMenu.component';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { reodering, selectedRoutine } from 'redux/exercises/exercises.slice';
import { WorkoutExercise } from 'redux/types';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { reorderRoutine } from 'redux/exercises/thunks/routineActions.thunk';
import StartWorkoutModal from 'components/modals/StartWorkout.modal';

const RoutineControl: FC<{
  data: WorkoutExercise[];
  routineId: string;
  planName: string;
}> = ({ data, routineId, planName }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isReordering = useAppSelector(reodering);
  const routine = useAppSelector(selectedRoutine);

  const [modalVisible, setModalVisible] = useState(false);
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

  const controlsBorders = {
    borderBottomRightRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [30, 20, 10],
    }),
    borderBottomLeftRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [30, 20, 10],
    }),
    borderTopRightRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [30, 5, 0],
    }),
    borderTopLeftRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [30, 5, 0],
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
    <>
      {isReordering ? (
        <Animated.View
          style={[styles.actionsContainer, { ...controlsBorders }]}
        >
          <TouchableOpacity
            onPress={() => {
              if (routine) {
                void dispatch(
                  reorderRoutine({
                    routineId,
                    planName,
                    routine: { ...routine, data: data },
                  })
                );
              }
            }}
            style={[styles.button, { flex: 1 }]}
            disabled={!routine}
          >
            <TextWrapperComponent
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontFamily: TYPOGRAPHY.FONTS.regular,
              }}
            >
              Done
            </TextWrapperComponent>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View
          style={[styles.actionsContainer, { ...controlsBorders }]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ListOfExercise');
            }}
            style={[styles.button]}
            disabled={!routine}
          >
            <AddIconWhite {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
          </TouchableOpacity>
          <StartWorkoutModal />
          <TouchableOpacity>
            <WorkoutActionsPoppingMenu
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  actionsContainer: {
    position: 'absolute',
    bottom: 80,
    left: (Dimensions.get('screen').width - WORKOUT_ACTIONS_LAYOUT.WIDTH) / 2,
    width: WORKOUT_ACTIONS_LAYOUT.WIDTH,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLOR_SCHEME.WORKOUT_ACTIONS,
  },
  button: {
    paddingHorizontal: WORKOUT_ACTIONS_LAYOUT.getPadding(),
    paddingVertical: 20,
  },
});

export default RoutineControl;
