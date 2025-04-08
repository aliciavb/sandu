// app/index.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: COLORS.secondary,
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
	pointerEvents: 'none',
  },
  title: {
    fontSize: SIZES.title,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  mainText: {
    fontSize: SIZES.subtitle,
    color: COLORS.text.primary,
  },
});
