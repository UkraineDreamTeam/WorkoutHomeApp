import React from 'react';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatisticsScreenProps} from '../types';

const StatisticsScreen = ({navigation}: StatisticsScreenProps) => {
  return (
    <SafeAreaView>
      <Button
        title="to Home from Statistic"
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CurrentWorkout',
            params: {caption: 'fe'},
          })
        }
      />
    </SafeAreaView>
  );
};

export default StatisticsScreen;
