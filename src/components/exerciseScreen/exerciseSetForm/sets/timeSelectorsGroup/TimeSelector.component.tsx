import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '@shared/theme';
import { TimeItem } from 'components/exerciseScreen/exerciseSetForm/selectors/TimeItem.component';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { form, setDuration } from '@redux/workoutForm/workoutForm.slice';
import TextWrapperComponent from 'shared/wrapperComponents/TextWrapper.component';

export const TimeSelector = () => {
  const dispatch = useAppDispatch();
  const workoutForm = useAppSelector(form);
  const [seconds, setSeconds] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');
  const [errorSeconds, setErrorSeconds] = useState(false);
  const [errorMinutes, setErrorMinutes] = useState(false);
  const setDurationTimeOnBlur = (name: 'seconds' | 'minutes') => {
    if (name === 'seconds' && !errorSeconds && !errorMinutes) {
      dispatch(
        setDuration({
          duration: {
            seconds: (seconds ? '00' + seconds : '00').slice(-2),
          },
          ms: (Number(minutes || 0) * 60 + Number(seconds)) * 1000,
        })
      );
      setSeconds((seconds ? '00' + seconds : '00').slice(-2));
    }
    if (name === 'minutes' && !errorMinutes) {
      dispatch(
        setDuration({
          duration: {
            minutes: (minutes ? '00' + minutes : '00').slice(-2),
          },
          ms: (Number(minutes) * 60 + Number(seconds || 0)) * 1000,
        })
      );
      setMinutes((minutes ? '00' + minutes : '00').slice(-2));
    }
    if (errorSeconds) {
      setSeconds(('00' + workoutForm.duration.seconds).slice(-2));
      setErrorSeconds(false);
    }
    if (errorMinutes) {
      setMinutes(('00' + workoutForm.duration.minutes).slice(-2));
      setErrorMinutes(false);
    }
  };

  useEffect(() => {
    setSeconds(workoutForm.duration.seconds);
    setMinutes(workoutForm.duration.minutes);
  }, []);
  return (
    <View style={styles.container}>
      <TextWrapperComponent style={[styles.title]}>
        Duration:
      </TextWrapperComponent>
      <View style={styles.timeContainer}>
        <TimeItem
          value={minutes}
          setValue={setMinutes}
          name={'minutes'}
          error={errorMinutes}
          setError={setErrorMinutes}
          setTimeOnBlur={setDurationTimeOnBlur}
          setModal={true}
        />
        <TextWrapperComponent style={styles.timeDots}>:</TextWrapperComponent>
        <TimeItem
          value={seconds}
          setValue={setSeconds}
          name={'seconds'}
          error={errorSeconds}
          setError={setErrorSeconds}
          setTimeOnBlur={setDurationTimeOnBlur}
          setModal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  timeDots: { fontSize: 32, color: COLORS.WHITE },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 15,
    textAlign: 'center',
    padding: 6,
    alignSelf: 'center',
    textAlignVertical: 'center',
    height: 50,
  },
});
