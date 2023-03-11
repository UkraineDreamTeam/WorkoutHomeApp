import React, { FC, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import { useAppDispatch } from 'redux/store';
import { addWorkoutPlan } from 'redux/exercises/thunks/workoutPlan.thunk';
import AddPlanOrRoutineContent from 'components/modals/AddPlanOrRoutine/AddPlanOrRoutineContent.component';
import AddPlanNoPlanButtonComponent from 'components/modals/AddPlanOrRoutine/AddButtons/AddPlanNoPlanButton.component';

type Props = {
  title: string;
};

const AddPlanComponent: FC<Props> = ({ title }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();

  const inputRef = useRef<TextInput>(null);
  const handleSubmit = () => {
    if (name) {
      dispatch(addWorkoutPlan(name));
      setModalVisible(false);
    } else {
      setError('Can`t be empty');
    }
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  const handleOpen = () => setModalVisible(true);
  const handleBackgroundTouch = () => {
    if (inputRef?.current?.isFocused()) {
      inputRef.current.blur();
      Keyboard.dismiss();
    } else {
      setModalVisible(false);
    }
  };

  return (
    <View style={[{ flex: 1, justifyContent: 'center', padding: 20 }]}>
      <AddPlanOrRoutineContent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleBackgroundTouch={handleBackgroundTouch}
        inputRef={inputRef}
        title={title}
        error={error}
        setName={setName}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
      <AddPlanNoPlanButtonComponent handleOpen={handleOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOpen: {
    height: 60,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    backgroundColor: COLORS.BLOCK_GREY,
  },
  textStyle: {
    color: COLORS.PINK,
    fontSize: 20,
    padding: 10,
    fontWeight: '600',
  },
});

export default AddPlanComponent;
