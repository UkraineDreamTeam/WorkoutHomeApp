import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import BackIcon from '@icons-components/BackIcon.component';
import DeleteIcon from '@icons-components/DeleteIcon.component';
import DoneIcon from '@icons-components/DoneIcon.component';
import { WorkoutExercise } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  addExercisesToRoutine,
  updateExerciseInRoutine,
} from 'redux/exercises/thunks/workoutPlan.thunk';
import { selectedPlan, selectedRoutine } from 'redux/exercises/exercises.slice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'shared/types/types';
import { clearForms, sets } from 'redux/workoutForm/workoutForm.slice';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';

type Props = {
  exercise: WorkoutExercise;
};
const Header: FC<Props> = ({ exercise }) => {
  const routine = useAppSelector(selectedRoutine);
  const plan = useAppSelector(selectedPlan);
  const allSets = useAppSelector(sets);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const addExercise = () => {
    if (routine?.id && plan?.name) {
      if (exercise.routineId) {

        void dispatch(
          updateExerciseInRoutine({
            exercise: { ...exercise, sets: allSets },
            routineId: routine.id,
            planName: plan.name,
          })
        );
      } else {
        void dispatch(
          addExercisesToRoutine({
            exercises: [
              {
                ...exercise,
                sets: allSets,
              },
            ],
            routineId: routine.id,
            planName: plan.name,
          })
        );
      }
    }
    dispatch(clearForms());
    navigation.navigate('Home', {
      screen: 'CurrentWorkout',
    });
  };
  const handleCancel = () => {
    navigation.navigate('Home', {
      screen: 'CurrentWorkout',
    });
  };
  return (
    <SafeAreaView style={styles.headerContainer}>
      <BackIcon />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonDelete]}
          onPress={handleCancel}
        >
          <DeleteIcon />
          <TextWrapperComponent style={styles.text}>
            Delete
          </TextWrapperComponent>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonDone]}
          onPress={addExercise}
        >
          <DoneIcon />
          <TextWrapperComponent style={styles.text}> Done</TextWrapperComponent>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 18,
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
    backgroundColor: COLORS.BLACK,
    marginRight: 15,
  },
  buttonDone: {
    backgroundColor: COLORS.PINK,
  },
  buttonsContainer: {
    flexDirection: 'row',
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

export default Header;
