import React from 'react'
import { Store } from "../../../../Store/Store";
import { ThemeContext } from "../../../../Store/ThemeContext";


export const useStateDrawer = () => {
  const {dispatchAppState, appState } = React.useContext(Store);
  const { isSetting, isPublicPage, isDrawerOpen, footerItems} = appState
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