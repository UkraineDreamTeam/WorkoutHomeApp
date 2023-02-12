import React from 'react';
import { View } from 'react-native';
import SetItemComponent from 'components/exerciseScreen/exerciseSetForm/setsList/SetItem.component';
import { useAppSelector } from 'redux/store';
import { sets } from 'redux/workoutForm/workoutForm.slice';

export const SetListComponent = () => {
  const setsList = useAppSelector(sets);

  return (
    <View>
      {setsList
        ? setsList.map(el => {
            return <SetItemComponent key={el.id} data={el} />;
          })
        : null}
    </View>
  );
};
