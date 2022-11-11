import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import FiltersSection from '../components/filters/FiltersSection.component';
import BackIconFilter from '../components/icons/BackIconFilter';
import {
  exercises,
  filters,
  selectedFilters,
} from '../redux/exercises/exercises.slice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { COLORS } from '../theme';
import { HomeTabParamList } from '../types/types';

const FiltersScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
  const bodyParts = useAppSelector(filters.bodyPartsList);
  const equipment = useAppSelector(filters.equipmentList);
  const types = useAppSelector(filters.typesList);
  const targets = useAppSelector(filters.targetsList);
  const exerciseList = useAppSelector(exercises);
  const selected = useAppSelector(selectedFilters);

  console.log('xxxxx');

  // const { filterExercises } = useFilter();
  const handleFilters = () => {
    // dispatch(clearFilters());
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[{ width: Dimensions.get('screen').width }]}>
      <Pressable style={[styles.header]}>
        <BackIconFilter handleFilters={handleFilters} />
        <Text style={[styles.title]}>Filters</Text>
      </Pressable>

      <FiltersSection key={'Type'} title="Type" list={types} name={'type'} />
      <FiltersSection
        key={'Muscle'}
        title="Muscle"
        list={targets}
        name={'target'}
      />
      <FiltersSection
        key={'Bodyparts'}
        title="Bodyparts"
        list={bodyParts}
        name={'bodyPart'}
      />
      <FiltersSection
        key={'Equipment'}
        title="Equipment"
        list={equipment}
        name={'equipment'}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 40,
    alignSelf: 'flex-start',
    padding: 10,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    display: 'flex',
    alignContent: 'flex-start',
    width: Dimensions.get('screen').width,
  },
  title: {
    height: 30,
    color: COLORS.WHITE,
    fontSize: 20,
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    paddingRight: 50,
  },
});

export default FiltersScreen;
