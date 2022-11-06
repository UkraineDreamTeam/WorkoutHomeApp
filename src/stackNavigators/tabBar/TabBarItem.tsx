import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Home from '../../assets/icons/Home.svg';
import Statistics from '../../assets/icons/Statistics.svg';
import ProfileIcon from '../../components/icons/ProfileIcon';

const TabBarItem = ({
  descriptors,
  state,
  route,
  index,
  navigation,
}: BottomTabBarProps & {
  index: number;
  route: { [key: string]: string };
}) => {
  const tabAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useCallback(() => {
    Animated.timing(tabAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [tabAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(tabAnim, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [tabAnim]);
  const { options } = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const isFocused = useMemo(() => {
    return state.index === index;
  }, [state, index]);

  const onPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    fadeOut();
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };
  useEffect(() => {
    if (isFocused) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [fadeIn, fadeOut, isFocused]);

  const tabIconAnimation = useMemo(() => {
    return {
      opacity: !isFocused ? 0.6 : 1,
      transform: [
        {
          translateY: tabAnim.interpolate({
            inputRange: [0, 10, 20],
            outputRange: [10, 5, 0],
          }),
        },
        {
          scale: tabAnim.interpolate({
            inputRange: [0, 10, 20],
            outputRange: [1, 0.9, 0.8],
          }),
        },
      ],
      // height: tabAnim.interpolate({
      //   inputRange: [0, 10, 20],
      //   outputRange: [40, 35, 30],
      // }),
    };
  }, [tabAnim, isFocused]);

  const tabTextAnimation = useMemo(() => {
    return [
      { color: isFocused ? 'white' : 'transparent' },
      {
        transform: [
          {
            translateY: tabAnim.interpolate({
              inputRange: [0, 10, 20],
              outputRange: [20, 10, 0],
            }),
          },
        ],
        opacity: tabAnim.interpolate({
          inputRange: [0, 15, 20],
          outputRange: [0, 0.4, 1],
        }),
      },
    ];
  }, [tabAnim, isFocused]);

  const getTabIcon = () => {
    if (route.name === 'Home') {
      return <Home />;
    }
    if (route.name === 'Statistics') {
      return <Statistics />;
    }

    if (route.name === 'Profile') {
      return <ProfileIcon />;
    }
  };

  return (
    <TouchableOpacity
      key={index}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={e => onPress(e)}
      onLongPress={onLongPress}
      style={style.tab}
    >
      <Animated.View>{getTabIcon()}</Animated.View>
      <Animated.Text style={tabTextAnimation}>{label.toString()}</Animated.Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  tab: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    paddingVertical: 10,
  },
});

export default TabBarItem;
