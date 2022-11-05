import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import AddIconWhite from '../assets/icons/AddIconWhite.svg';
import Start from '../assets/icons/Start.svg';
import { COLOR_SCHEME, WORKOUT_ACTIONS_LAYOUT } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import WorkoutActionsPoppingMenu from './WorkoutActionsPoppingMenu.component';

const RoutineControl = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useCallback(() => {
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(menuAnim, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuAnim]);

  const controlsBorders = {
    borderBottomRightRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [30, 20, 10],
    }),
    borderBottomLeftRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [30, 20, 10],
    }),
    borderTopRightRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [30, 5, 0],
    }),
    borderTopLeftRadius: menuAnim.interpolate({
      inputRange: [0, 10, 20],
      outputRange: [30, 5, 0],
    }),
  };

  useEffect(() => {
    if (modalVisible) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [setModalVisible, modalVisible, fadeIn, fadeOut]);
  return (
    <Animated.View style={[style.actionsContainer, { ...controlsBorders }]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ListOfExercise')}
        style={[style.button]}
      >
        <AddIconWhite {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity style={[style.button]}>
        <Start {...WORKOUT_ACTIONS_LAYOUT.SVG_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity>
        <WorkoutActionsPoppingMenu
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // menuBorders={menuBorders}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
const style = StyleSheet.create({
  actionsContainer: {
    position: 'absolute',
    bottom: 80,
    left: (Dimensions.get('screen').width - WORKOUT_ACTIONS_LAYOUT.WIDTH) / 2,
    width: WORKOUT_ACTIONS_LAYOUT.WIDTH,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLOR_SCHEME.WORKOUT_ACTIONS,
  },
  button: {
    paddingHorizontal: WORKOUT_ACTIONS_LAYOUT.getPadding(),
    paddingVertical: 20,
  },
});

export default RoutineControl;
