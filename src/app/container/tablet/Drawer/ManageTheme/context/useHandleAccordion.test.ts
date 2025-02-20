import { test, expect } from '@jest/globals';
import { whiteUnChanged } from '../../../../../stores/theme/lib/paramsFromTheme';
import { ThemeParams } from '../../../../../stores/theme/ThemeProvider';
import { isThemeParamsChanged } from './useHandleAccordion';

test('isThemeParamsChanged 変更されている', () => {
  const ChangedWhiteThemeParams: ThemeParams = {
    selected_theme: 'white',
    theme_color: '#263200',
    theme_font1: '未設定',
    theme_font2: '"M PLUS Rounded 1c"',
    theme_font_heading: '"ヒラギノ角ゴ ProN"',
  };

  expect(isThemeParamsChanged(ChangedWhiteThemeParams)).toBe(true);
});
test('isThemeParamsChanged 変更されていない', () => {
  expect(isThemeParamsChanged(whiteUnChanged)).toBe(false);
});
