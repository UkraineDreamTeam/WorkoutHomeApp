import { createAsyncThunk } from '@reduxjs/toolkit';
import { Exercise, Filter } from './types';
import { URL } from '../../constants';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFileLocationPath,
  getFileLocationUri,
  getFileType,
} from '../../utils/utils';

export const getExercises = createAsyncThunk<Exercise[], Filter | undefined>(
  'exercises/getByQuery',
  async () => {
    // let queryParams = '?';
    // for (const key in query) {
    //   queryParams += `${key}=${query[key]}`;
    // }
    try {
      const response = await fetch(`${URL}`);
      const data = await response.json();
      const imagePath = getFileLocationPath();

      for (let i = 0; i < data.length; i++) {
        const value = await AsyncStorage.getItem(data[i].id);
        const locationUri = getFileLocationUri(data[i].gifUrl, data[i].id);

        if (!value) {
          try {
            await AsyncStorage.setItem(
              data[i].id,
              JSON.stringify({
                ...data[i],
                gifUrl: locationUri,
              })
            );
          } catch (error) {}
        }
        const isUploaded = await RNFS.exists(
          imagePath + '/' + data[i].id + getFileType(data[i].gifUrl)
        );

        if (!isUploaded) {
          RNFS.downloadFile({
            fromUrl: data[i].gifUrl,
            toFile: imagePath + '/' + data[i].id + getFileType(data[i].gifUrl),
          });
        }
      }

      return data;
    } catch (error) {
      return { error };
    }
  }
);
