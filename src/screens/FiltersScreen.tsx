import React from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FiltersSection from '../components/filters/FiltersSection.component';
import { filters } from '../redux/exercises/exercises.slice';
import { useAppSelector } from '../redux/store';

const FiltersScreen = () => {
  const bodyParts = useAppSelector(filters.bodyPartsList);
  const equipment = useAppSelector(filters.equipmentList);
  const types = useAppSelector(filters.typesList);
  const targets = useAppSelector(filters.targetsList);
  return (
    <SafeAreaView style={[{ width: Dimensions.get('screen').width }]}>
      <FiltersSection key={'Type'} title="Type" list={types} />
      <FiltersSection key={'Muscle'} title="Muscle" list={targets} />
      <FiltersSection key={'Bodyparts'} title="Bodyparts" list={bodyParts} />
      <FiltersSection key={'Equipment'} title="Equipment" list={equipment} />
    </SafeAreaView>
  );
};

export default FiltersScreen;
