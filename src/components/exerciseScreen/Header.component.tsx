import React, { FC } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import BackIcon from '@icons-components/BackIcon.component';
import DeleteIcon from '@icons-components/DeleteIcon.component';
import DoneIcon from '@icons-components/DoneIcon.component';
import { Exercise } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { addExercisesToRoutine } from 'redux/exercises/thunks/workoutPlan.thunk';
import { selectedPlan, selectedRoutine } from 'redux/exercises/exercises.slice';

type Props = {
  exercise: Exercise;
};
const Header: FC<Props> = ({ exercise }) => {
  const routine = useAppSelector(selectedRoutine);
  const plan = useAppSelector(selectedPlan);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.headerContainer}>
      <BackIcon />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonDelete]}
          onPress={() => {
            if (routine?.id && plan?.name) {
              dispatch(
                addExercisesToRoutine({
                  exercises: [
                    {
                      ...exercise,
                      time: 'f',
                      weight: 'h',
                      reps: 'h',
                      sets: 'h',
                    },
                  ],
                  routineId: routine.id,
                  planName: plan.name,
                })
              );
            }
          }}
        >
          <DeleteIcon />
          <Text style={styles.text}> Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonDone]}>
          <DoneIcon />
          <Text style={styles.text}> Done</Text>
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
