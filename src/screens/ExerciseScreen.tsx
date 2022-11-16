import React, { FC, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import AddPhoto from '../components/exerciseScreen/AddPhoto.component';
import PlanForm from '../components/exerciseScreen/exerciseSetForm/PlanForm.component';

import Header from '../components/exerciseScreen/Header.component';
import FullScreenImage from '../components/modals/FullScreenImage.modal';
import { exercises } from '../redux/exercises/exercises.slice';
import { useAppSelector } from '../redux/store';
import { COLORS, TYPOGRAPHY } from '../theme';
import { ExerciseScreenProps } from '../types/types';

const ExerciseScreen: FC<ExerciseScreenProps> = ({
  route: {
    params: { name, bodyPart, gifUrl, id },
  },
}) => {
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.container}
      enabled
    >
      <SafeAreaView
        style={[
          {
            position: 'relative',
            flex: 1,
            justifyContent: 'flex-end',
          },
        ]}
      >
        <Header />
        <View style={[style.descriptionContainer]}>
          <Text style={[style.exerciseName]}>{name}</Text>
          <Text style={[style.exerciseName]}>{bodyPart}</Text>
        </View>
        <View style={[style.photoContainer]}>
          <View style={[style.photosBackground]}>
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
              horizontal={false}
              numColumns={3}
              style={{
                height:
                  images.length > 3
                    ? Dimensions.get('screen').width - 160
                    : (Dimensions.get('screen').width - 170) / 2,
              }}
            />
          </View>
          <AddPhoto id={id} />
        </View>

        <PlanForm />
        <View style={{ flex: 1 }} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
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
  container: { flex: 1 },
});

export default ExerciseScreen;
