import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../types';

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <Button
        title="To Home"
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CurrentWorkout',
            params: {caption: 'dwer'},
          })
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
