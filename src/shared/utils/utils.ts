import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
export const getFileType = (path: string) =>
  '.' + path.match(/(?<=[.])([^\/.]*?)(?=$)/gm);
export const getFileLocationUri = (path: string, id: string) => {
  const fileExtension = getFileType(path);

  if (fileExtension) {
    return `file:${getFileLocationPath()}/${id}${fileExtension}`;
  } else {
    return '';
  }
};
export const getFileLocationPath = () => {
  return `${
    Platform.OS === 'android' ? RNFS.DocumentDirectoryPath : RNFS.MainBundlePath
  }`;
};
