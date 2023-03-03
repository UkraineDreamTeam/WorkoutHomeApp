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

export const safeJsonParse = <T>(guard: (o: any) => o is T) => {
  return (text: string): ParseResult<T> => {
    const parsed = JSON.parse(text) as string;
    return guard(parsed) ? { parsed, hasError: false } : { hasError: true };
  };
};

export type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error?: unknown };
