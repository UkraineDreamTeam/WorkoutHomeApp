import React, { FC } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { RenderRoutineItemComponent } from 'components/workoutPlans/WorkoutPlanSelector/RoutineItem.component';
import { Routine, WorkoutPlan } from 'redux/types';
import AddRoutine from 'components/modals/AddPlanOrRoutine/AddRoutineModal.component';

type Props = {
  selectedItem: WorkoutPlan | undefined;
};

const RoutinesComponent: FC<Props> = ({ selectedItem }) => {
  return (
    <View style={[{ paddingLeft: 5, flexDirection: 'row' }]}>
      <View
        style={[
          { width: Dimensions.get('screen').width - 105, paddingRight: 5 },
        ]}
      >
        <FlatList
          style={[styles.routines]}
          contentContainerStyle={{ flexGrow: 1 }}
          data={selectedItem?.routines || []}
          renderItem={RenderRoutineItemComponent}
          keyExtractor={(item: Routine) => item.id}
          horizontal
        />
      </View>
      <AddRoutine title={'New routine'} />
    </View>
  );
};
export const styles = StyleSheet.create({
  routines: {
    flex: 1,
    height: '100%',
  },
});
export default RoutinesComponent;
