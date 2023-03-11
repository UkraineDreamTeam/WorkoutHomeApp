import React, { FC, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { addRoutine } from 'redux/exercises/thunks/workoutPlan.thunk';
import AddPlanOrRoutineContent from 'components/modals/AddPlanOrRoutine/AddPlanOrRoutineContent.component';
import { selectedPlan } from 'redux/exercises/exercises.slice';
import DropShadow from 'react-native-drop-shadow';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';

type Props = {
  title: string;
};

const AddRoutine: FC<Props> = ({ title }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();

  const selected = useAppSelector(selectedPlan);

  const inputRef = useRef<TextInput>(null);
  const handleSubmit = () => {
    if (name) {
      dispatch(addRoutine({ planId: selected!.id, routine: name }));
      setModalVisible(false);
    } else {
      setError('Can`t be empty');
    }
  };
  const handleClose = () => {
    setModalVisible(false);
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
          alignItems: 'flex-end',
          alignSelf: 'flex-end',
          zIndex: -1,
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
      <DropShadow
        style={{
          shadowColor: COLORS.PINK,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
          zIndex: -1,
        }}
      >
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.buttonOpen}
        >
          <TextWrapperComponent style={styles.textStyle}>
            New routine
          </TextWrapperComponent>
        </Pressable>
      </DropShadow>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AddRoutine;
