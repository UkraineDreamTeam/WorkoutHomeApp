import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import Sound from 'react-native-sound';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  handleRunTimer,
  timerCount,
} from 'redux/workoutTimer/workoutTimer.slice';

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
  const timer = useAppSelector(timerCount);

  const [shadowTimer, setShadowTimer] = useState(initialValue);
  const [timerStatus, setTimerStatus] = useState(OFF);
  const [intervalID, setIntervalID] = useState<number | null>(null);
  const [boxShadowintervalID, setBoxShadowintervalID] = useState<number | null>(
    null
  );
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

  const startTimer = useCallback(() => {
    if (timerStatus === OFF) {
      const timerID = setInterval(() => {
        dispatch(handleRunTimer());
      }, interval);
      setIntervalID(timerID);
      const shadowTimerID = setInterval(() => {
        setShadowTimer(currentTime => currentTime - 1);
      }, interval * 2);
      setBoxShadowintervalID(shadowTimerID);
      setTimerStatus(ON);
    }
  }, [interval, timerStatus]);

  useEffect(() => {
    if (timer === 0) {
      if (intervalID && boxShadowintervalID) {
        clearInterval(intervalID);
        clearInterval(boxShadowintervalID);
        show();
        onTimeOut();
      }
      setTimerStatus(OFF);
      return;
    }
  }, [timer, interval, intervalID, timerStatus, onTimeOut]);

  // function resetTimer(newValue: number) {
  //   setTimer(newValue + initialValue);
  // }

  useEffect(() => {
    setMinutes(`0${Math.floor(timer / 60)}`.slice(-2));
    setSeconds(`0${timer % 60}`.slice(-2));
  }, [timer]);

  useEffect(() => {
    if (shadowTimer % 2 === 0) {
      hide();
    } else {
      show();
    }
  }, [shadowTimer]);

  return {
    timer,

    minutes,
    seconds,
    shadowAnim,
    startTimer,
  };
};
