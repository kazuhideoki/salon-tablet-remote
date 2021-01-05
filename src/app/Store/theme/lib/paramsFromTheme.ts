import { SelectedTheme } from '../../../../util/interface/Interface';
import { ThemeParams } from '../ThemeProvider';
import { themeWhite } from './themes/themeWhite';
import { themeNatural } from './themes/themeNatural';
import { themeDefault } from './themes/themeDefault';

const defaultThemeUnChanged: ThemeParams = {
  selected_theme: 'default',
  theme_color: '#311b92',
  theme_font1: '未設定',
  theme_font2: '"M PLUS Rounded 1c"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};

export const whiteUnChanged: ThemeParams = {
  selected_theme: 'white',
  theme_color: '#263238',
  theme_font1: '未設定',
  theme_font2: '"M PLUS Rounded 1c"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};

const naturalUnChanged: ThemeParams = {
  selected_theme: 'natural',
  theme_color: '#5d4037',
  theme_font1: '未設定',
  theme_font2: '"Noto Serif JP"',
  theme_font_heading: '"Noto Serif JP"',
};

export const switchingTheme = (params: ThemeParams) => {
  // user_infoのselected_themeをもとにテーマを適応
  switch (params.selected_theme) {
    case 'default':
      return themeDefault(params);
    case 'white':
      return themeWhite(params);
    case 'natural':
      return themeNatural(params);

    default:
      return themeDefault(params);
  }
};

export const generateDefaultParamsFromTheme = (
  selectedTheme: SelectedTheme
): ThemeParams => {
  switch (selectedTheme) {
    case 'default':
      return defaultThemeUnChanged;
    case 'white':
      return whiteUnChanged;
    case 'natural':
      return naturalUnChanged;

    default:
      return defaultThemeUnChanged;
  }
};
