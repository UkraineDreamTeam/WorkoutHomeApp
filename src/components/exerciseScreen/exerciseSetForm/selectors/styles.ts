import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@shared/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    textAlign: 'center',
  },
  text: {
    padding: 4,
    color: COLORS.WHITE,
    fontSize: 15,
  },
});
