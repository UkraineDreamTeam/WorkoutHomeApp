import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { COLORS } from 'shared/theme';

import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  restTime,
  setRestBetweenSets,
} from 'redux/workoutForm/workoutForm.slice';
import { TimeItem as RestTimeItem } from 'components/exerciseScreen/exerciseSetForm/selectors/TimeItem.component';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';
type ChangeEvent = { nativeEvent: { text: string } };
const RestTimeSelectorComponent = () => {
  const dispatch = useAppDispatch();
  const rest = useAppSelector(restTime);

  const [seconds, setSeconds] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');
  const [errorSeconds, setErrorSeconds] = useState(false);
  const [errorMinutes, setErrorMinutes] = useState(false);
  const setRestTimeOnBlur = (name: 'seconds' | 'minutes') => {
    if ((seconds || minutes) && !errorSeconds && !errorMinutes) {
      dispatch(
        setRestBetweenSets({
          restTime: {
            [name]: ((name === 'seconds' ? seconds : minutes) || '00').slice(
              -2
            ),
          },
          ms: (Number(minutes) * 60 + Number(seconds)) * 1000,
        })
      );
      name === 'seconds'
        ? setSeconds((seconds || '00').slice(-2))
        : setMinutes((minutes || '00').slice(-2));
      console.log(rest);
    }
    if (errorSeconds) {
      setSeconds(rest.seconds);
      setErrorSeconds(false);
    }
    if (errorMinutes) {
      setSeconds(rest.minutes);
      setErrorMinutes(false);
    }
  };

  useEffect(() => {
    setSeconds(rest.seconds);
    setMinutes(rest.minutes);
  }, [rest.minutes, rest.seconds]);
  return (
    <View style={styles.container}>
      <TextWrapperComponent style={[styles.title]}>Time:</TextWrapperComponent>
      <View style={styles.timeContainer}>
        <RestTimeItem
          value={minutes}
          setValue={setMinutes}
          name={'minutes'}
          error={errorMinutes}
          setError={setErrorMinutes}
          setTimeOnBlur={setRestTimeOnBlur}
          setModal={false}
        />
        <TextWrapperComponent style={styles.timeDots}>
          {' '}
          min.
        </TextWrapperComponent>
        <RestTimeItem
          value={seconds}
          setValue={setSeconds}
          name={'seconds'}
          error={errorSeconds}
          setError={setErrorSeconds}
          setTimeOnBlur={setRestTimeOnBlur}
          setModal={false}
        />
        <TextWrapperComponent style={styles.timeDots}>
          {' '}
          sec.
        </TextWrapperComponent>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width * 0.8,
    alignSelf: 'center',
  },
  timeDots: { fontSize: 15, color: COLORS.WHITE, alignSelf: 'flex-end' },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 15,
    textAlign: 'center',

    alignSelf: 'center',
    textAlignVertical: 'center',
    height: 50,
  },
});
export default RestTimeSelectorComponent;
