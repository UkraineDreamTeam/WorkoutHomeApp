import React, { useEffect } from 'react';

import { RootStackParamList } from '../types/types';
import HomeNavigator from './HomeStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatisticsScreen from '../screens/StatisticsScreen';
import Profile from '../screens/Profile';
import MyTabBar from './tabBar/TabBar';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { useAppDispatch } from '../redux/store';
import { getExercises } from '../redux/exercises/exrcises.thunk';

const TabStack = createBottomTabNavigator<RootStackParamList>();

const BottomStackNavigator = ({
  navigationRef,
}: {
  navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  return (
    <TabStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#343D54',
          position: 'absolute',
          height: 30,
        },
      }}
      tabBar={props => <MyTabBar {...props} navigationRef={navigationRef} />}
    >
      <TabStack.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: 'My workout',
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'transparent',
        }}
      />
      <TabStack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: 'Statistics',
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'transparent',
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'transparent',
        }}
      />
    </TabStack.Navigator>
  );
};

export default BottomStackNavigator;
