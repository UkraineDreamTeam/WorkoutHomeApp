import {
  BottomTabBarProps,
  BottomTabNavigationConfig,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationContainerRefWithCurrent,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useMemo, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import {ICONS_PATHS} from '../constants';
import {RootStackParamList} from '../types';

function MyTabBar({
  state,
  descriptors,
  navigation,
  navigationRef,
}: BottomTabBarProps & {
  navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
}) {
  return (
    <View style={{flexDirection: 'row', backgroundColor: '#343D54'}}>
      {state.routes.map((route, index) => {
        const fadeAnim = useRef(new Animated.Value(0)).current;

        const fadeIn = () => {
          // Will change fadeAnim value to 1 in 5 seconds
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        };

        const fadeOut = () => {
          // Will change fadeAnim value to 0 in 3 seconds
          Animated.timing(fadeAnim, {
            toValue: 20,
            duration: 300,
            useNativeDriver: true,
          }).start();
        };
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          fadeOut();
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
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
        }, [state]);

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,

              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,

              paddingVertical: 5,
            }}>
            <Animated.Image
              source={ICONS_PATHS[route.name]}
              style={{
                opacity: !isFocused ? 0.6 : 1,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 10, 20],
                      outputRange: [10, 5, 0],
                    }),
                  },
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 10, 20],
                      outputRange: [1.2, 1.1, 1],
                    }),
                  },
                ],
              }}
            />
            <Animated.Text
              style={[
                {color: isFocused ? 'white' : 'transparent'},
                {
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 10, 20],
                        outputRange: [20, 10, 0],
                      }),
                    },
                  ],
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 15, 20],
                    outputRange: [0, 0.4, 1],
                  }),
                },
              ]}>
              {label.toString()}
            </Animated.Text>
            {/* <Animated.Text
              style={[
                {color: isFocused ? 'white' : 'transparent'},
                {
                  height: fadeAnim,
                  opacity: 0.6,
                },
              ]}>
              {label.toString()}
            </Animated.Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;
