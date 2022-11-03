import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

import { RootStackParamList } from '../types/types';

import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';

const WorkoutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const signIn = async () => {
    try {
      const userSub = async () => await firebase.auth().signInAnonymously();
      return userSub;
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{ zIndex: 0 }}>
      <Pressable
        onPress={e => {
          e.preventDefault();
          const path = RNFS.DocumentDirectoryPath + '/test.txt';
          console.log('Working');

          // write the file
          RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
            .then(async () => {
              console.log('FILE WRITTEN!');
              const reference = storage().ref('/test.txt');
              const pathToFile = `${RNFS.DocumentDirectoryPath}/test.txt`;
              // uploads file
              await reference.putFile(pathToFile);
            })
            .catch(err => {
              console.log(err.message);
            });
          navigation.navigate('ListOfExercise');
        }}
        style={{
          borderWidth: 2,
          borderColor: theme.colors.border,
          // height: 20,
          // width: 30,
        }}
      >
        <Text style={{ fontSize: 20, color: 'white' }}>press me</Text>
      </Pressable>
      <Pressable
        onPress={e => {
          e.preventDefault();
          const path = RNFS.DocumentDirectoryPath + '/test.txt';
          console.log('Working');
          // write the file
          RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
            .then(() => {
              console.log('FILE WRITTEN!');
            })
            .catch(err => {
              console.log(err.message);
            });
          navigation.navigate('ListOfExercise');
        }}
        style={{
          borderWidth: 2,
          borderColor: theme.colors.border,
          // height: 20,
          // width: 30,
        }}
      >
        <Text style={{ fontSize: 20, color: 'white' }}>press me</Text>
      </Pressable>

      <Pressable
        onPress={async e => {
          e.preventDefault();
          // firebase.auth().signOut();
          // console.log('Working');
          await signIn();
          navigation.navigate('ListOfExercise');
        }}
        style={{
          borderWidth: 2,
          borderColor: theme.colors.border,
          height: 60,
        }}
      >
        <Text style={{ fontSize: 20, color: 'white' }}>press me</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default WorkoutScreen;
