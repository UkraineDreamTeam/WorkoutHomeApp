import React from 'react';
import { Dimensions, SafeAreaView, View, Text } from 'react-native';
import FiltersSection from '../components/filters/FiltersSection.component';
import BackIcon from '../components/icons/BackIcon.component';
import { filters } from '../redux/exercises/exercises.slice';
import { useAppSelector } from '../redux/store';
import { COLORS } from '../theme';

const FiltersScreen = () => {
  const bodyParts = useAppSelector(filters.bodyPartsList);
  const equipment = useAppSelector(filters.equipmentList);
  const types = useAppSelector(filters.typesList);
  const targets = useAppSelector(filters.targetsList);
  return (
    <SafeAreaView style={[{ width: Dimensions.get('screen').width }]}>
      <View
        style={[
          {
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
        ]}
      >
        <BackIcon />
        <Text
          style={[
            {
              height: 30,
              color: COLORS.WHITE,
              fontSize: 20,
              alignSelf: 'center',
              flexGrow: 1,
              textAlign: 'center',
              paddingRight: 50,
            },
          ]}
        >
          Filters
        </Text>
      </View>

      <FiltersSection key={'Type'} title="Type" list={types} />
      <FiltersSection key={'Muscle'} title="Muscle" list={targets} />
      <FiltersSection key={'Bodyparts'} title="Bodyparts" list={bodyParts} />
      <FiltersSection key={'Equipment'} title="Equipment" list={equipment} />
    </SafeAreaView>
  );
};

export default FiltersScreen;
