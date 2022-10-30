import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { COLOR_SCHEME, PATH_TO_SHOW_BOTTOM_BAR } from '../constants';

import { RootStackParamList } from '../types/types';
import TabBarItem from './TabBarItem';

function MyTabBar(
  props: BottomTabBarProps & {
    navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>;
  }
) {
  const { navigationRef, state } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const show = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const hide = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const routeName = navigationRef.getCurrentRoute()?.name;
    if (routeName && typeof routeName === 'string') {
      if (PATH_TO_SHOW_BOTTOM_BAR[routeName]) {
        show();
      } else {
        hide();
      }
    }
  }, [fadeAnim, show, hide, navigationRef, state]);

  return (
    <Animated.View
      style={[
        style.tabBarContainer,

        {
          backgroundColor: COLOR_SCHEME.BACKGROUND,
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
            backgroundColor: COLOR_SCHEME.TAB_BAR,
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

    width: '100%',
    zIndex: 1,
  },
  tabContainer: {
    flex: 1,

    position: 'absolute',
    bottom: 0,
  },
});
export default MyTabBar;
