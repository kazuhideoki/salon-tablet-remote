import React from 'react'
import { TThemeParams } from '../../../../../Store/theme/ThemeProvider';
import { isThemeParamsChanged } from "../../../../../Store/theme/lib/paramsFromTheme";
import { UserInfoContext } from '../../../../../Store/userInfo/Context';

export const useHandleAccordion = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const {
    selected_theme,
    theme_color,
    theme_font1,
    theme_font2,
    theme_font_heading,
  } = userInfo;
  const themeParams: TThemeParams = {
    selected_theme: selected_theme,
    theme_color: theme_color,
    theme_font1: theme_font1,
    theme_font2: theme_font2,
    theme_font_heading: theme_font_heading,
  };
  const [expanded, setExpanded] = React.useState(
    isThemeParamsChanged(themeParams)
  );

  const handleAccordion = (panel: boolean) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? true : false);
  };

  return {expanded, handleAccordion}
}