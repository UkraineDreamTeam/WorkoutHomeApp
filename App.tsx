import React from 'react';

import {
  DarkTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { RootStackParamList } from './src/types';
import HomeNavigator from './src/screens/HomeStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatisticsScreen from './src/screens/StatisticsScreen';
import Profile from './src/screens/Profile';
import MyTabBar from './src/components/TabBar';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const TabStack = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  // You can also use a regular ref with `React.useRef()`

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          dark: false,
          colors: { ...DarkTheme.colors, background: '#36404F' },
        }}>
        <TabStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarStyle: { backgroundColor: '#343D54' },
          }}
          tabBar={props => (
            <MyTabBar {...props} navigationRef={navigationRef} />
          )}>
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
    </Provider>
  );
};

export default App;
