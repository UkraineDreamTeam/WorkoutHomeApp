import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, SafeAreaView } from 'react-native';

import { RootStackParamList } from '../types/types';

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={{ backgroundColor: 'black' }}>
      <Button
        title="To Home"
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CurrentWorkout',
          })
        }
      />
    </SafeAreaView>
  );
};
export default Profile;
