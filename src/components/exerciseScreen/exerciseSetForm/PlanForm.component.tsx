import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TYPOGRAPHY } from '@shared/theme';
import RestBetweenSetsContainerComponent from 'components/exerciseScreen/exerciseSetForm/restBetweenSets/RestBetweenSetsContainer.component';
import { CreateSetModal } from 'components/exerciseScreen/exerciseSetForm/sets/CreateSetForm.component';
import { SetListComponent } from 'components/exerciseScreen/exerciseSetForm/setsList/SetsList.component';

const PlanForm = () => {
  return (
    <View style={styles.container}>
      <SetListComponent />
      <CreateSetModal />
      <RestBetweenSetsContainerComponent />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    padding: 20,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    marginHorizontal: 12,
    marginTop: 12,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 14,
    marginVertical: 5,
  },
});
export default PlanForm;
