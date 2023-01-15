import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS } from 'shared/theme';
import { RestBetweenSetsSecondsSelector } from '@components/exerciseScreen/exerciseSetForm/selectors/RestBetweenSetsSecondsSelector.component';
import { RestBetweenSetsMinutesSelector } from 'components/exerciseScreen/exerciseSetForm/selectors/RestBetweenSetsMinutesSeelctor.component';
import { useAppSelector } from 'redux/store';
import { restTime } from 'redux/workoutForm/workoutForm.slice';

const RestTimeSelectorComponent = () => {
  const rest = useAppSelector(restTime);

  const [seconds, setSeconds] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');

  useEffect(() => {
    setSeconds(rest.seconds);
    setMinutes(rest.minutes);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>Time:</Text>
      <View style={styles.timeContainer}>
        <RestBetweenSetsMinutesSelector value={minutes} setValue={setMinutes} />
        <Text style={styles.timeDots}> min.</Text>
        <RestBetweenSetsSecondsSelector value={seconds} setValue={setSeconds} />
        <Text style={styles.timeDots}> sec.</Text>
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
