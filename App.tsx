import React from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { RootStackParamList } from './src/types/types';
import HomeNavigator from './src/screens/HomeStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatisticsScreen from './src/screens/StatisticsScreen';
import Profile from './src/screens/Profile';
import MyTabBar from './src/components/TabBar';
import { CustomTheme } from './src/theme';

const TabStack = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  return (
    // <Provider store={store}>
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: false,
        colors: { ...CustomTheme.colors },
      }}
    >
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
    </NavigationContainer>
    // </Provider>
  );
};

export default App;
