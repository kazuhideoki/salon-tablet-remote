import React from 'react'
import { FooterItemsContext } from '../../../../../Store/footerItems/Context';
import { Store } from "../../../../../Store/Store";
import { ThemeContext } from "../../../../../Store/ThemeContext";


export const useStateDrawer = () => {
  const {dispatchAppState, appState } = React.useContext(Store);
  const { isSetting, isPublicPage, isDrawerOpen} = appState
  const { footerItems } = React.useContext(FooterItemsContext);
  const [pass, setPass] = React.useState('')
  const themes = React.useContext(ThemeContext);

  return {
    dispatchAppState,
    isSetting,
    isPublicPage,
    isDrawerOpen,
    footerItems,
    pass,
    setPass,
    themes
  };
}