import * as types from "./types";
import { T_footer_icon_size, T_is_generate_public_page, T_show_article_type, T_theme_color, T_theme_font } from "../Types";
import { T_user_info_update } from "../../../pages/api/user_info/update";
import { TThemeParams } from "../ThemeContext";

export const update = (userInfo: T_user_info_update) => ({
         type: types.UPDATE,
         payload: userInfo,
       });
export const setTheme = (themeParams: TThemeParams) => ({
         type: types.SET_THEME,
         payload: themeParams,
       });
export const setThemeColor = (themeColor: T_theme_color) => ({
         type: types.SET_THEME_COLOR,
         payload: themeColor,
       });
export const setThemeFont1 = (themeFont: T_theme_font) => ({
         type: types.SET_THEME_FONT1,
         payload: themeFont,
       } as const);
export const setThemeFont2 = (themeFont: T_theme_font) => ({
         type: types.SET_THEME_FONT2,
         payload: themeFont,
       });
export const setThemeFontHeading = (themeFont: T_theme_font) => ({
         type: types.SET_THEME_FONT_HEADING,
         payload: themeFont,
       });
export const setFooterIconSize = (footerIconSize: T_footer_icon_size) => ({
         type: types.SET_FOOTER_ICON_SIZE,
         payload: footerIconSize,
       });
export const setShowArticleType = (showArticleType: T_show_article_type) => ({
         type: types.SET_SHOW_ARTICLE_TYPE,
         payload: showArticleType,
       });
export const setIsGeneratePublicPage = (
         is_generate_public_page: T_is_generate_public_page
       ) => ({
         type: types.SET_IS_GENERATE_PUBLIC_PAGE,
         payload: is_generate_public_page,
       });

export type TUserInfoAction = 
  ReturnType<typeof update>
  | ReturnType<typeof setTheme>
  | ReturnType<typeof setThemeColor>
  | ReturnType<typeof setThemeFont1>
  | ReturnType<typeof setThemeFont2>
  | ReturnType<typeof setThemeFontHeading>
  | ReturnType<typeof setFooterIconSize>
  | ReturnType<typeof setShowArticleType>
  | ReturnType<typeof setIsGeneratePublicPage>
