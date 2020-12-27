import React from 'react'
import { Store } from '../../../../../Store/Store';
import { TThemeParams } from '../../../../../Store/ThemeContext';
import { isThemeParamsChanged } from "../../../../../Store/themes/paramsFromTheme";

export const useHandleAccordion = () => {
  const { appState } = React.useContext(Store);
  const {
    selected_theme,
    theme_color,
    theme_font1,
    theme_font2,
    theme_font_heading,
  } = appState.userInfo;
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