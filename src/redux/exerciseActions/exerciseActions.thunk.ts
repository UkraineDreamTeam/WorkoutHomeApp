import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ImageLibraryOptions } from 'react-native-image-picker';

export const createWorkout = createAsyncThunk<
  { status: 'ok' | 'error' },
  { name: string }
>('workout/create', async ({ name }) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify({ name }));
    return { status: 'ok' };
  } catch (error) {
    return { status: 'error' };
  }
});
export type Params = {
  options: ImageLibraryOptions;
  source: 'gallery';
};
