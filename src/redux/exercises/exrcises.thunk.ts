import { createAsyncThunk } from '@reduxjs/toolkit';

import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';

import { Exercise, Filter } from './types';
import { ASYNC_STORAGE_KEYS, URL } from '../../constants';
import {
  getFileLocationPath,
  getFileLocationUri,
  getFileType,
} from '../../utils/utils';
import { AppDispatch } from '../store';
import {
  bodyParts,
  equipment,
  increment,
  targets,
  total,
  types,
} from './actions';

const setFilters = (exercises: Exercise[], dispatch: AppDispatch) => {
  const equipmentList: string[] = [];
  const targetsList: string[] = [];
  const typesList: string[] = [];
  const bodyPartsList: string[] = [];
  for (const exercise of exercises) {
    if (!equipmentList.includes(exercise.equipment)) {
      equipmentList.push(exercise.equipment);
    }
    if (!targetsList.includes(exercise.target)) {
      targetsList.push(exercise.target);
    }
    if (!typesList.includes(exercise.type)) {
      typesList.push(exercise.type);
    }

    if (!bodyPartsList.includes(exercise.bodyPart)) {
      bodyPartsList.push(exercise.bodyPart);
    }
  }
  dispatch(equipment(equipmentList));
  dispatch(types(typesList));
  dispatch(bodyParts(bodyPartsList));
  dispatch(targets(targetsList));
};
type Res = { res: { data?: Exercise[]; error?: any } };
export const getExercises = createAsyncThunk<
  Res,
  Filter | undefined,
  { dispatch: AppDispatch }
>('exercises/getByQuery', async (_, { dispatch }) => {
  try {
    const dataUploadState = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.DATA);
    if (dataUploadState) {
      const exercises: Exercise[] = JSON.parse(dataUploadState);
      setFilters(exercises, dispatch);
      return { res: { data: exercises } };
    } else {
      await firebase.auth().signInAnonymously();
      const response = await fetch(`${URL}`);
      console.log(dataUploadState);
      const data = await response.json();
      const imagePath = getFileLocationPath();
      dispatch(total(data.length));
      const newCollection = [];

      for (let i = 0; i < data.length; i++) {
        const locationUri = getFileLocationUri(data[i].gifUrl, data[i].id);

        newCollection.push({
          ...data[i],
          gifUrl: locationUri,
        });

        const isUploaded = await RNFS.exists(
          imagePath + '/' + data[i].id + getFileType(data[i].gifUrl)
        );

        if (!isUploaded) {
          try {
            const reference = storage().ref(
              data[i].id + getFileType(data[i].gifUrl)
            );
            const url = await reference.getDownloadURL();
            if (reference && url) {
              RNFS.downloadFile({
                fromUrl: url,
                toFile:
                  imagePath + '/' + data[i].id + getFileType(data[i].gifUrl),
              }).promise.then(() => {
                dispatch(increment());
              });
            }
          } catch (error) {
            return { res: { error } };
          }
        }
      }
      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.DATA, JSON.stringify(data));
      setFilters(data, dispatch);
      return { res: { data, error: undefined } };
    }
  } catch (error) {
    return { res: { data: undefined, error } };
  }
});
