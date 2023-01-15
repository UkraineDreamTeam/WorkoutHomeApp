import { createAsyncThunk } from '@reduxjs/toolkit';
import RNFS, { unlink } from 'react-native-fs';
import storage from '@react-native-firebase/storage';
import { Exercise, Filter } from '@redux/types';
import { ASYNC_STORAGE_KEYS } from '@shared/constants/keys';
import {
  getFileLocationPath,
  getFileLocationUri,
  getFileType,
} from '@shared/utils/utils';
import { AppDispatch } from '@redux/store';
import {
  bodyParts,
  equipment,
  increment,
  targets,
  total,
  types,
} from '@redux/exercises/actions';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  getItemByKey,
  setItemByKey,
} from 'redux/exercises/requests/asyncStorage.requests';
import { getDataFromFirebase } from 'redux/exercises/requests/firebase.requests';

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
    const dataUploadState = await getItemByKey(ASYNC_STORAGE_KEYS.DATA);
    if (dataUploadState) {
      const exercises: Exercise[] = JSON.parse(dataUploadState);
      setFilters(exercises, dispatch);

      return { res: { data: exercises } };
    } else {
      const imagePath = getFileLocationPath();
      const data = await getDataFromFirebase();

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
      await setItemByKey(
        ASYNC_STORAGE_KEYS.DATA,
        JSON.stringify(newCollection)
      );

      setFilters(newCollection, dispatch);
      return { res: { newCollection, error: undefined } };
    }
  } catch (error) {
    return { res: { data: undefined, error } };
  }
});
export const addExtraImage = createAsyncThunk<Exercise[] | [], string>(
  'gallery/getImages',
  async id => {
    try {
      const params: { options: ImageLibraryOptions; source: string } = {
        options: {
          mediaType: 'photo',
          selectionLimit: 0,
        },
        source: 'gallery',
      };
      const response = await launchImageLibrary(params.options);

      if (response.assets) {
        const exercises = (await getItemByKey(ASYNC_STORAGE_KEYS.DATA)) || '';
        const parsedExercise: Exercise[] = exercises.length
          ? JSON.parse(exercises)
          : [];
        const imagePath = getFileLocationPath();

        const extraImages = response.assets.map(el => {
          const match = el?.fileName?.match(/^.*?(?=[.])/gm);
          if (el.uri && el.fileName && match && match.length) {
            return `file:${imagePath + '/' + el.fileName}`;
          } else {
            return '';
          }
        });

        for (const image of response.assets) {
          if (image.fileName && image.uri) {
            await RNFS.copyFile(image.uri, imagePath + '/' + image.fileName);
          }
        }
        const newExercises = parsedExercise.map(el =>
          el.id === id
            ? {
                ...el,
                extraImages: [
                  ...(el.extraImages ? el.extraImages : []),
                  ...extraImages,
                ],
              }
            : el
        );
        try {
          await setItemByKey(
            ASYNC_STORAGE_KEYS.DATA,
            JSON.stringify(newExercises)
          );
        } catch (error) {
          return [];
        }

        return newExercises || [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
);
export const deleteImage = createAsyncThunk<
  Exercise[] | [],
  { id: string; imageUri: string }
>('data/deleteExtraImage', async ({ id, imageUri }) => {
  try {
    const exercises = (await getItemByKey(ASYNC_STORAGE_KEYS.DATA)) || '';
    const parsedExercises: Exercise[] = exercises.length
      ? JSON.parse(exercises)
      : [];
    if (parsedExercises.length) {
      const mapedExercises = parsedExercises.map(el =>
        el.id === id
          ? {
              ...el,
              extraImages: el.extraImages?.filter(el => el !== imageUri),
            }
          : el
      );

      await unlink(imageUri.replace('file:', ''));

      await setItemByKey(
        ASYNC_STORAGE_KEYS.DATA,
        JSON.stringify(mapedExercises)
      );

      return mapedExercises;
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
});
