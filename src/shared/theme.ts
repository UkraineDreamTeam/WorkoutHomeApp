export const COLORS = {
  BLACK: 'black',
  VIOLET: '#BA6BD8',
  WHITE: '#ffffff',
  PINK: '#DA0AAC',
  GREY: '#36404F',
  LIGHT_GREY: '#D9D9D9',
  BLUE_GREY: '#343D54',
  BLOCK_GREY: '#252934',
  RED: 'rgb(136, 8, 8)',
  YELLOW: '#787929',
  TRANSPARENT: 'transparent',
};
export const CustomTheme = {
  dark: true,
  colors: {
    primary: '#BA6BD8',
    background: '#36404F',
    card: '#343D54',
    text: COLORS.WHITE,
    border: '#BA6BD8',
    notification: 'rgb(255, 69, 58)',
  },
};

export const TYPOGRAPHY = {
  BORDER_RADIUS: { small: 5, average: 10, big: 20 },
  tabBarHeight: 50,
  FONTS: {
    bold: 'Quicksand-Bold',
    medium: 'Quicksand-Medium',
    light: 'Quicksand-Light',
    regular: 'Quicksand-Regular',
    semibold: 'Quicksand-SemiBold',
  },
};

export const COLOR_SCHEME = {
  BACKGROUND: CustomTheme.colors.background,
  TAB_BAR: CustomTheme.colors.card,
  MODAL_BACKGROUND: CustomTheme.colors.card,
  WORKOUT_ACTIONS: CustomTheme.colors.primary,
  CARD_COLOR: COLORS.BLACK,
  ANOTHER_ACTIONS: COLORS.PINK,
  WHITE100: COLORS.GREY,
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
