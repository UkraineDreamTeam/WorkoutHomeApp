import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemByKey = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const setItemByKey = async (key: string, data: string) => {
  await AsyncStorage.setItem(key, data);
};