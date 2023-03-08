import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from 'shared/theme';

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
        ? setSeconds(('00' + (seconds || '00')).slice(-2))
        : setMinutes(('00' + (minutes || '00')).slice(-2));
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
  }, []);
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
          sec.
        </TextWrapperComponent>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
  },
  timeDots: {
    fontSize: 15,
    color: COLORS.WHITE,
    alignSelf: 'center',
    marginHorizontal: 5,
    fontFamily: TYPOGRAPHY.FONTS.medium,
  },
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
    marginRight: 30,
    fontFamily: TYPOGRAPHY.FONTS.medium,
  },
});
export default RestTimeSelectorComponent;
