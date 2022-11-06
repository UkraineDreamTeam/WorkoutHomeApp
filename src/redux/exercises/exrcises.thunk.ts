import { createAsyncThunk } from '@reduxjs/toolkit';
import { Exercise, Filter } from './types';
import { ASYNC_STORAGE_KEYS, URL } from '../../constants';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFileLocationPath,
  getFileLocationUri,
  getFileType,
} from '../../utils/utils';
import storage from '@react-native-firebase/storage';
import { AppDispatch } from '../store';
import { increment, total } from './actions';
import { firebase } from '@react-native-firebase/auth';

export const getExercises = createAsyncThunk<
  Exercise[],
  Filter | undefined,
  { dispatch: AppDispatch }
>('exercises/getByQuery', async (_, { dispatch }) => {
  try {
    const dataUploadState = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.DATA);
    if (dataUploadState) {
      return JSON.parse(dataUploadState);
    } else {
      await firebase.auth().signInAnonymously();
      const response = await fetch(`${URL}`);
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
            return { error };
          }
        }
      }
      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.DATA, JSON.stringify(data));

      return data;
    }
  } catch (error) {
    return { error };
  }
});
