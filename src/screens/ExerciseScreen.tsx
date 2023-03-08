import React, { FC, useEffect, useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import AddPhoto from '@components/exerciseScreen/AddPhoto.component';
import PlanForm from '@components/exerciseScreen/exerciseSetForm/PlanForm.component';

import Header from '@components/exerciseScreen/Header.component';
import FullScreenImage from '@components/modals/FullScreenImage.modal';
import { exercises } from '@redux/exercises/exercises.slice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import { ExerciseScreenProps } from '@shared/types/types';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { retrieveSetsFromExercise } from 'redux/workoutForm/workoutForm.slice';

const ExerciseScreen: FC<ExerciseScreenProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { name, bodyPart, gifUrl, id, routineId, sets } = route.params;
  const exercisesList = useAppSelector(exercises);
  const images = useMemo(() => {
    return [
      { uri: gifUrl, deletable: false },
      ...(exercisesList.find(el => el.id)?.extraImages || []).map(el => ({
        uri: el,
        deletable: true,
      })),
    ];
  }, [exercisesList, gifUrl]);

  useEffect(() => {
    if (routineId && sets) {
      dispatch(retrieveSetsFromExercise(sets));
    }
  }, [dispatch, routineId, sets]);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={styles.container}
    //   enabled
    // >
    <ScrollView
      style={[
        {
          position: 'relative',
          flex: 1,
          // justifyContent: 'flex-end',
        },
      ]}
    >
      <Header exercise={route.params} />
      <View style={[styles.descriptionContainer]}>
        <TextWrapperComponent style={[styles.exerciseName , {fontFamily: TYPOGRAPHY.FONTS.bold}]}>
          {name}
        </TextWrapperComponent>
        <TextWrapperComponent style={[styles.exerciseName ,  {fontFamily: TYPOGRAPHY.FONTS.regular}]}>
          {bodyPart}
        </TextWrapperComponent>
      </View>
      <View style={[styles.photoContainer]}>
        <View style={[styles.photosBackground]}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <FullScreenImage
                uri={item.uri}
                deletable={item.deletable}
                id={id}
              />
            )}
            keyExtractor={item => item.uri}
            horizontal={true}
            // numColumns={3}
            style={{
              height: 130,
            }}
          />
        </View>
        <AddPhoto id={id} />
      </View>

      <PlanForm />
      <View style={{ flex: 1 }} />
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  exerciseName: {
    fontSize: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    textTransform: 'capitalize',
    marginVertical: 10,
  },
  exerciseCategory: {
    fontSize: 20,
    paddingBottom: 5,
    textTransform: 'capitalize',
    borderColor: COLORS.LIGHT_GREY,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
  },
  photoContainer: { flexDirection: 'column' },
  photosBackground: {
    backgroundColor: COLORS.BLACK,
    padding: 10,
    margin: 10,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
  },
  container: { flex: 1, paddingBottom: 60 },
});

export default ExerciseScreen;
