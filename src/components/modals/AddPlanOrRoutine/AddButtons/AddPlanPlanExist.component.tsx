import React, { FC, useRef, useState, Dispatch } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import AddPlanOrRoutineContent from 'components/modals/AddPlanOrRoutine/AddPlanOrRoutineContent.component';

import { useAppDispatch } from 'redux/store';
import { addWorkoutPlan } from 'redux/exercises/thunks/workoutPlan.thunk';
import AddPlanPlansExistButtonComponent from 'components/modals/AddPlanOrRoutine/AddButtons/AddPlanPlansExistButton.component';
type Props = {
  title: string;
  setOpen: Dispatch<boolean>;
};

const AddPlanPlanExistComponent: FC<Props> = ({ title, setOpen }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();

  const inputRef = useRef<TextInput>(null);
  const handleSubmit = () => {
    if (name) {
      dispatch(addWorkoutPlan(name));
      setModalVisible(false);
      setOpen(false);
    } else {
      setError('Can`t be empty');
    }
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  const handleOpen = () => {
    setModalVisible(true);
  };
  const handleBackgroundTouch = () => {
    if (inputRef?.current?.isFocused()) {
      inputRef.current.blur();
      Keyboard.dismiss();
    } else {
      setModalVisible(false);
    }
  };
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',

          position: 'absolute',

          zIndex: 2,
          left: 5,
          top: 55,
        },
      ]}
    >
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
      <AddPlanPlansExistButtonComponent handleOpen={handleOpen} />
    </View>
  );
};

export default AddPlanPlanExistComponent;
