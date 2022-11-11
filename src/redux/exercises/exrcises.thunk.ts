import { createAsyncThunk } from '@reduxjs/toolkit';

import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Exercise, Filter } from './types';
import { ASYNC_STORAGE_KEYS, COLLECTION_KEY } from '../../constants';
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
  const equipmentList: Filter[] = [];
  const targetsList: Filter[] = [];
  const typesList: Filter[] = [];
  const bodyPartsList: Filter[] = [];
  for (const exercise of exercises) {
    if (equipmentList.findIndex(el => el.value === exercise.equipment) === -1) {
      equipmentList.push({
        value: exercise.equipment,
        selected: false,
        isSelectable: true,
      });
    }
    if (targetsList.findIndex(el => el.value === exercise.target) === -1) {
      targetsList.push({
        value: exercise.target,
        selected: false,
        isSelectable: true,
      });
    }
    if (typesList.findIndex(el => el.value === exercise.type) === -1) {
      typesList.push({
        value: exercise.type,
        selected: false,
        isSelectable: true,
      });
    }

    if (bodyPartsList.findIndex(el => el.value === exercise.bodyPart) === -1) {
      bodyPartsList.push({
        value: exercise.bodyPart,
        selected: false,
        isSelectable: true,
      });
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
      const response = await firestore().collection(COLLECTION_KEY).get();

      const data = response.docs.map(x => x.data() as Exercise);

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
