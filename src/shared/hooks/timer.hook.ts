import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import Sound from 'react-native-sound';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { handleRunTimer, time } from 'redux/workoutTimer/workoutTimer.slice';

Sound.setCategory('Playback');

const ding = new Sound('ding.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ',
    ding.getDuration(),
    'number of channels: ',
    ding.getNumberOfChannels()
  );
});

const ON = 'on';
const OFF = 'off';
const REST = 'rest';
const SET = 'set';
const defaultTimerValue = 3;
const defaultTimerInterval = 1000;
const defaultTimeOutCallback = () => {
  ding.setVolume(10);

  ding.play();
};
export const useCountDownTimer = ({
  initialValue = defaultTimerValue,
  interval = defaultTimerInterval,
  onTimeOut = defaultTimeOutCallback,
} = {}) => {
  const dispatch = useAppDispatch();
  const timerCount = useAppSelector(time);
  const [timer, setTimer] = useState(initialValue);
  const [shadowTimer, setShadowTimer] = useState(0);
  const [timerStatus, setTimerStatus] = useState(OFF);
  const [intervalID, setIntervalID] = useState<number>(0);
  const [boxShadowintervalID, setBoxShadowintervalID] = useState<number>(0);
  const [seconds, setSeconds] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');
  const shadowAnim = useRef(new Animated.Value(0)).current;

  const show = useCallback(() => {
    Animated.timing(shadowAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [shadowAnim]);

  const hide = useCallback(() => {
    Animated.timing(shadowAnim, {
      toValue: 16,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [shadowAnim]);

  useEffect(() => {
    console.log('useEffect1', timerCount, timerStatus);

    if (!timerCount && timerStatus === OFF) {
      return;
    }

    if (timerStatus === OFF && timerCount > 0) {
      if (interval === 0) {
        return;
      }
      console.log('useEffect2', timerCount);

      const timerID = setInterval(() => {
        setTimer(currentValue => (currentValue > 0 ? currentValue - 1 : 0));
        dispatch(handleRunTimer());
      }, interval);
      setIntervalID(timerID);
      const shadowTimerID = setInterval(() => {
        setShadowTimer(currentTime => (currentTime === 0 ? 1 : 0));
      }, interval);
      setBoxShadowintervalID(shadowTimerID);
      setTimerStatus(ON);
    }

    if (timerCount === 0 && timerStatus === ON) {
      console.log('useEffect2', timerCount);
      if (intervalID && boxShadowintervalID) {
        clearInterval(intervalID);
        clearInterval(boxShadowintervalID);
        show();
        onTimeOut();
      }
      setTimerStatus(OFF);
      return;
    }
  }, [timerCount]);

  // function resetTimer(newValue: number) {
  //   setTimer(newValue + initialValue);
  // }
  useEffect(() => {
    console.log(intervalID);
  }, [intervalID]);

  useEffect(() => {
    setMinutes(`0${Math.floor(timerCount / 60)}`.slice(-2));
    setSeconds(`0${timerCount % 60}`.slice(-2));
  }, [timerCount]);

  useEffect(() => {
    if (shadowTimer === 0) {
      hide();
    } else {
      show();
    }
  }, [shadowTimer]);

  return {
    minutes,
    seconds,
    shadowAnim,

    timer,
  };
};
