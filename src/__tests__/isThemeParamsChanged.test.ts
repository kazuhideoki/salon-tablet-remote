import { whiteUnChanged } from '../app/Store/theme/lib/paramsFromTheme';
import { TThemeParams } from '../app/Store/theme/ThemeProvider';
import { isThemeParamsChanged } from '../app/View/tablet/Drawer/ManageTheme/context/useHandleAccordion';

test('isThemeParamsChanged 変更されている', () => {
  const ChangedWhiteThemeParams: TThemeParams = {
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
