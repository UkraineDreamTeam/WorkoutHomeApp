import React, { FC } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { WorkoutExercise } from '@redux/types';
import { getFileLocationUri } from '@shared/utils/utils';
import FastImage from 'react-native-fast-image';
import { COLORS, CustomTheme, TYPOGRAPHY } from '@shared/theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@shared/types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
import { useAppSelector } from 'redux/store';
import { reodering } from 'redux/exercises/exercises.slice';

const ExerciseItem: FC<{
  data: WorkoutExercise;
  onLongPress?: () => void;
  startDrag?: boolean;
}> = ({ data, onLongPress, startDrag }) => {
  const { gifUrl, name, bodyPart, target, id, sets, routineId } = data;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const reorder = useAppSelector(reodering);
  const handlePressItem = () => {
    if (!reorder) {
      navigation.navigate('Exercise', data);
    }
  };
  return (
    <View
      style={[
        styles.exerciseItemContainer,
        startDrag ? { borderColor: COLORS.PINK, borderWidth: 2 } : {},
      ]}
    >
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={handlePressItem}
        onLongPress={onLongPress}
      >
        <View style={styles.imageContainer}>
          <FastImage
            source={{ uri: getFileLocationUri(gifUrl, id) }}
            style={styles.image}
            accessible={true}
            fallback={true}
          />
        </View>
        <View style={[styles.textContainer]}>
          <View>
            <TextWrapperComponent style={[styles.exerciseName, styles.text]}>
              {name}
            </TextWrapperComponent>
            <TextWrapperComponent style={[styles.text, styles.subtitle]}>
              {bodyPart}
            </TextWrapperComponent>
          </View>
          <TextWrapperComponent style={[styles.text, styles.subtitle]}>
            {target}
          </TextWrapperComponent>
        </View>
      </TouchableOpacity>
      {sets
        ? sets.map(
            (
              {
                sets,
                reps,
                duration: { seconds, minutes },
                weight,
                durationMS,
              },
              index
            ) => {
              return (
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      padding: 5,
                      marginLeft: 20,
                      width: '80%',
                    },
                  ]}
                  key={index}
                >
                  <Image
                    source={require('@assets/icons/PinkDot.png')}
                    style={[{ alignSelf: 'center' }]}
                  />

                  {Number(sets) ? (
                    <TextWrapperComponent style={[styles.configText]}>
                      {sets} {sets % 10 === 1 ? 'set' : 'sets'}
                    </TextWrapperComponent>
                  ) : null}
                  {Number(reps) ? (
                    <TextWrapperComponent style={[styles.configText]}>
                      {reps} {reps % 10 === 1 ? 'rep' : 'reps'}
                    </TextWrapperComponent>
                  ) : null}
                  {Number(weight) ? (
                    <TextWrapperComponent style={[styles.configText]}>
                      {weight} kg
                    </TextWrapperComponent>
                  ) : null}
                  {durationMS ? (
                    <TextWrapperComponent style={[styles.configText]}>
                      {minutes}:{seconds}
                    </TextWrapperComponent>
                  ) : null}
                </View>
              );
            }
          )
        : null}
      {sets && sets[0]?.setRestTimeMS ? (
        <TextWrapperComponent
          style={{ width: '100%', textAlign: 'right', padding: 10 }}
        >
          Rest: {('00' + sets[0]?.setRestTime?.minutes).slice(-2)}:
          {('00' + sets[0]?.setRestTime?.seconds).slice(-2)}
        </TextWrapperComponent>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  exerciseItemContainer: {
    backgroundColor: COLORS.BLOCK_GREY,
    borderRadius: 20,
    width: Dimensions.get('screen').width * 0.95,
    marginHorizontal: Dimensions.get('screen').width * 0.025,
    marginVertical: 6,
  },
  image: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',

    backgroundColor: 'black',
    padding: 20,
    borderRadius: 20,
  },
  exerciseName: {
    textTransform: 'capitalize',

    fontFamily: TYPOGRAPHY.FONTS.bold,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  text: { color: CustomTheme.colors.text, flexShrink: 1 },
  subtitle: { fontFamily: TYPOGRAPHY.FONTS.light },
  configText: {
    paddingHorizontal: 10,
    color: COLORS.WHITE,
    width: '25%',
    fontFamily: TYPOGRAPHY.FONTS.regular,
  },
});
export default ExerciseItem;
