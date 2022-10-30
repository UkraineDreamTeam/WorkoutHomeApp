import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  NavigationContainerRefWithCurrent,
  useTheme,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { PATH_TO_SHOW_BOTTOM_BAR } from '../constants';
import { RootStackParamList } from '../types/types';
import TabBarItem from './TabBarItem';

function MyTabBar(
  props: BottomTabBarProps & {
    navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>;
  }
) {
  const theme = useTheme();
  const { navigationRef, state } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useCallback(() => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const routeName = navigationRef.getCurrentRoute()?.name;
    console.log(routeName);

    if (routeName && typeof routeName === 'string') {
      if (PATH_TO_SHOW_BOTTOM_BAR[routeName]) {
        fadeIn();
      } else {
        fadeOut();
      }
    }
  }, [fadeAnim, fadeIn, fadeOut, navigationRef, state]);

  return (
    <Animated.View
      style={[
        style.tabBarContainer,
        {
          backgroundColor: theme.colors.background,
          position: 'absolute',
          bottom: 0,
          zIndex: fadeAnim.interpolate({
            inputRange: [0, 3, 20],
            outputRange: [1, -1, -1],
          }),
        },
      ]}
    >
      <Animated.View
        style={[
          style.tabBarContainer,
          {
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 20],
                  outputRange: [0, 100],
                }),
              },
            ],
          },
        ]}
      >
        {props.state.routes.map((route, index) => {
          return (
            <TabBarItem
              key={index}
              route={route as any}
              index={index}
              {...props}
            />
          );
        })}
      </Animated.View>
    </Animated.View>
  );
}
const style = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#343D54',
    width: '100%',
    zIndex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#343D54',
  },
});
export default MyTabBar;
