import { Dimensions, StyleSheet } from 'react-native';
import { TYPOGRAPHY } from 'shared/theme';

export const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'stretch',
    padding: 5,
  },
  container: {
    height: 60,
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    padding: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: TYPOGRAPHY.FONTS.bold,
    textAlign: 'center',
  },
});
