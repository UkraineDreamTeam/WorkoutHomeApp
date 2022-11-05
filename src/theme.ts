export const CustomTheme = {
  dark: false,
  colors: {
    primary: '#BA6BD8',
    background: '#36404F',
    card: '#343D54',
    text: 'white',
    border: '#BA6BD8',
    notification: 'rgb(255, 69, 58)',
  },
};
export const COLOR_SCHEME = {
  BACKGROUND: CustomTheme.colors.background,
  TAB_BAR: CustomTheme.colors.card,
  MODAL_BACKGROUND: CustomTheme.colors.card,
  WORKOUT_ACTIONS: CustomTheme.colors.primary,
  ANOTHER_ACTIONS: '#DA0AAC',
};
export const WORKOUT_ACTIONS_LAYOUT: {
  WIDTH: number;
  SVG_SIZE: { width: number; height: number };
  getPadding: () => number | undefined;
} = {
  WIDTH: 250,
  SVG_SIZE: { width: 40, height: 15 },
  getPadding() {
    return (this.WIDTH - this.SVG_SIZE.width * 3) / 6;
  },
};
