import React from 'react';
import { AppStateContext } from '../../../../../store/appState/Context';
import { FooterItemsContext } from '../../../../../store/footerItems/Context';
import { ThemeContext } from '../../../../../store/theme/ThemeProvider';

export const useStateDrawer = () => {
  const { dispatchAppState, appState } = React.useContext(AppStateContext);
  const { isSetting, isPublicPage, isDrawerOpen } = appState;
  const { footerItems } = React.useContext(FooterItemsContext);
  const [pass, setPass] = React.useState('');
  const themes = React.useContext(ThemeContext);

  return {
    dispatchAppState,
    isSetting,
    isPublicPage,
    isDrawerOpen,
    footerItems,
    pass,
    setPass,
    themes,
  };
};
