import React from 'react';
import { generateDefaultParamsFromTheme } from '../../../../../store/theme/lib/paramsFromTheme';
import { ThemeParams } from '../../../../../store/theme/ThemeProvider';
import { UserInfoContext } from '../../../../../store/userInfo/Context';
import Lodash from 'lodash';

export const useHandleAccordion = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const {
    selected_theme,
    theme_color,
    theme_font1,
    theme_font2,
    theme_font_heading,
  } = userInfo;
  const themeParams: ThemeParams = {
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
    event: React.ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? true : false);
  };

  return { expanded, handleAccordion };
};

export const isThemeParamsChanged = (themeParams: ThemeParams): boolean => {
  const originalThemeParams = generateDefaultParamsFromTheme(
    themeParams.selected_theme
  );

  const isSame = Lodash.isEqual(themeParams, originalThemeParams);

  return isSame ? false : true;
};
