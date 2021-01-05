import * as types from './types';
import {
  ThemeFont,
  ShowArticleType,
  FooterIconSize,
} from '../../../util/interface/Interface';
import { ApiUserInfoUpdate } from '../../../pages/api/user_info/update';
import { ThemeParams } from '../theme/ThemeProvider';

export const update = (userInfo: ApiUserInfoUpdate) => ({
  type: types.UPDATE,
  payload: userInfo,
});
export const setTheme = (themeParams: ThemeParams) => ({
  type: types.SET_THEME,
  payload: themeParams,
});
export const setThemeColor = (themeColor: string) => ({
  type: types.SET_THEME_COLOR,
  payload: themeColor,
});
export const setThemeFont1 = (themeFont: ThemeFont) =>
  ({
    type: types.SET_THEME_FONT1,
    payload: themeFont,
  } as const);
export const setThemeFont2 = (themeFont: ThemeFont) => ({
  type: types.SET_THEME_FONT2,
  payload: themeFont,
});
export const setThemeFontHeading = (themeFont: ThemeFont) => ({
  type: types.SET_THEME_FONT_HEADING,
  payload: themeFont,
});
export const setFooterIconSize = (footerIconSize: FooterIconSize) => ({
  type: types.SET_FOOTER_ICON_SIZE,
  payload: footerIconSize,
});
export const setShowArticleType = (showArticleType: ShowArticleType) => ({
  type: types.SET_SHOW_ARTICLE_TYPE,
  payload: showArticleType,
});
export const setIsGeneratePublicPage = (is_generate_public_page: boolean) => ({
  type: types.SET_IS_GENERATE_PUBLIC_PAGE,
  payload: is_generate_public_page,
});

export type UserInfoAction =
  | ReturnType<typeof update>
  | ReturnType<typeof setTheme>
  | ReturnType<typeof setThemeColor>
  | ReturnType<typeof setThemeFont1>
  | ReturnType<typeof setThemeFont2>
  | ReturnType<typeof setThemeFontHeading>
  | ReturnType<typeof setFooterIconSize>
  | ReturnType<typeof setShowArticleType>
  | ReturnType<typeof setIsGeneratePublicPage>;
