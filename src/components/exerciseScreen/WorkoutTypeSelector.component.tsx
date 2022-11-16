import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  modes,
  selectType,
  WorkoutTypes,
} from '../../redux/exerciseActions/exerciseActions.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { COLORS, TYPOGRAPHY } from '../../theme';

const WorkoutTypeSelector = () => {
  const modesTitles = useAppSelector(modes);
  const dispatch = useAppDispatch();
  return (
    <View style={[style.header]}>
      <Text style={[style.title]}> Select workout type:</Text>
      <View style={[style.buttonsContainer]}>
        {Object.entries(modesTitles).map(el => {
          return (
            <TouchableOpacity
              key={el[1].title}
              style={[
                style.button,
                {
                  backgroundColor: el[1].selected ? COLORS.PINK : 'transparent',
                },
              ]}
              onPress={() => dispatch(selectType(el[0] as keyof WorkoutTypes))}
            >
              <Text>{el[1].title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  header: { padding: 15 },
  title: {
    textAlign: 'center',
    color: COLORS.LIGHT_GREY,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },

  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.PINK,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    width: Dimensions.get('screen').width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkoutTypeSelector;
