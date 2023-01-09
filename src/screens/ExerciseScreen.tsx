import React, { FC, useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AddPhoto from '@components/exerciseScreen/AddPhoto.component';
import PlanForm from '@components/exerciseScreen/exerciseSetForm/PlanForm.component';

import Header from '@components/exerciseScreen/Header.component';
import FullScreenImage from '@components/modals/FullScreenImage.modal';
import { exercises } from '@redux/exercises/exercises.slice';
import { useAppSelector } from '@redux/store';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import { ExerciseScreenProps } from '@shared/types/types';

const ExerciseScreen: FC<ExerciseScreenProps> = ({ route }) => {
  const { name, bodyPart, gifUrl, id } = route.params;
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
      style={styles.container}
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
        <Header exercise={route.params} />
        <View style={[styles.descriptionContainer]}>
          <Text style={[styles.exerciseName]}>{name}</Text>
          <Text style={[styles.exerciseName]}>{bodyPart}</Text>
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
  container: { flex: 1 },
});

export default ExerciseScreen;
