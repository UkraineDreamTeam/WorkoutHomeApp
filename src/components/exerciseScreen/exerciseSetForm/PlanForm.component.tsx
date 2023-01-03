import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TYPOGRAPHY } from '@shared/theme';
import { CreateSetModal } from './sets/CreateSetForm.component';

const PlanForm = () => {
  return (
    <View style={styles.container}>
      <CreateSetModal />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
    marginHorizontal: 12,
    marginTop: 12,
  },
  title: {
    fontSize: 14,
    marginVertical: 5,
  },
});
export default PlanForm;
