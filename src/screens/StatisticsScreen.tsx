import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { StatisticsScreenProps } from '../types/types';

const StatisticsScreen = ({ navigation }: StatisticsScreenProps) => {
  return (
    <SafeAreaView>
      <Button
        title="to Home from Statistic"
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CurrentWorkout',
          })
        }
      />
    </SafeAreaView>
  );
};
export default StatisticsScreen;
