import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { COLLECTION_KEY } from '@shared/constants/keys';
import { Exercise } from '@redux/types';

export const getDataFromFirebase = async () => {
  await firebase.auth().signInAnonymously();
  const response = await firestore().collection(COLLECTION_KEY).get();

  const data = response.docs.map(x => x.data() as Exercise);
  return data;
};