import { useAuth } from '../../../../../util/auth/AuthProvider';
import { useHandleChange } from './context/useHandleChange';
import { useHandleChangeThemeColor } from './context/useHandleChangeThemeColor';
import {
  useHandleChangeThemeFont1,
  useHandleChangeThemeFont2,
  useHandleChangeThemeFontHeading,
} from './context/useHandleChangeThemeFont';
import { useHandleChangeFooterIconSize } from './context/useHandleChangeFooterIconSize';
import { useHandleChangeShowArticleType } from './context/useHandleChangeShowArticleType';
import { useHandleAccordion } from './context/useHandleAccordion';
import { useStateMangeTheme } from './context/useStateMangeTheme';

export type Hsl = {
  h: number;
  s: number;
  l: number;
};
export type Color = { hex: string; hsl: Hsl };

export const useManageTheme = () => {
  const {
    selected_theme,
    theme_color,
    show_article_type,
  } = useStateMangeTheme();

  const { user } = useAuth();

  const { expanded, handleAccordion } = useHandleAccordion();
  const handleChange = useHandleChange();
  const handleChangeThemeColor = useHandleChangeThemeColor();
  const { font1, handleChangeThemeFont1 } = useHandleChangeThemeFont1();
  const { font2, handleChangeThemeFont2 } = useHandleChangeThemeFont2();
  const {
    fontHeading,
    handleChangeThemeFontHeading,
  } = useHandleChangeThemeFontHeading();
  const handleChangeShowArticleType = useHandleChangeShowArticleType();
  const {
    footerIconSize,
    handleChangeFooterIconSize,
  } = useHandleChangeFooterIconSize();

  return {
    selected_theme,
    expanded,
    handleAccordion,
    theme_color,
    handleChangeThemeColor,
    font1,
    font2,
    fontHeading,
    footerIconSize,
    handleChangeThemeFont1,
    handleChangeThemeFont2,
    handleChangeThemeFontHeading,
    handleChangeFooterIconSize,
    show_article_type,
    handleChange,
    handleChangeShowArticleType,
    user,
  };
};

export type ManageThemePresenterProps = ReturnType<typeof useManageTheme>;
