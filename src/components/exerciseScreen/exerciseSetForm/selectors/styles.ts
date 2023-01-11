import { StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '@shared/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
  },
  contentContainer: { width: 50 },
  searchContainerStyle: {
    borderColor: 'white',
    width: 0,
    backgroundColor: 'transparent',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
  },
  searchTextInputStyle: {
    color: 'white',
    borderColor: 'white',
  },
  modalTitleStyle: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    height: 0,
    padding: 0,
    margin: 0,
    borderColor: 'none',
  },
  labelStyle: {
    color: 'white',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
    padding: 0,
  },
  textStyle: {
    fontSize: 15,
    color: 'white',
  },

  optionContainerStyle: {
    backgroundColor: 'black',
    width: 50,
    justifyContent: 'center',
  },
  optionTextStyle: {
    backgroundColor: 'black',
    width: 50,
    textAlign: 'center',
  },
});
