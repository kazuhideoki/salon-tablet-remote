import React from 'react';
import { DrawerPresenter } from '../app/View/Drawer/Drawer';
import { useTheme } from '@material-ui/core';
export default {
  title: "Drawer/Drawer",
  component: DrawerPresenter,
};



export const Close = () => {
  const theme = useTheme()
  const props = {
    theme: theme,
    appState: {
      isSetting: false,
      isDrawerOpen: false,
    },
    dispatchAppState: null,
    handleOpenArticleEditor: null,
    handleOpenFooterItemEditor: null,
    handleSubmitPassword: null,
    handleOnSingOut: null,
    open: false,
    handleDrawerOpen: null,
    handleDrawerClose: null,
    isMobile: null,
  };

  //@ts-ignore
  return <DrawerPresenter {...props}/>
}
export const Open = () => {
  const theme = useTheme()
  const props = {
    theme: theme,
    appState: {
      isSetting: false,
      isDrawerOpen: true,
    },
    dispatchAppState: null,
    handleOpenArticleEditor: null,
    handleOpenFooterItemEditor: null,
    handleSubmitPassword: null,
    handleOnSingOut: null,
    // open: true,
    handleDrawerOpen: null,
    handleDrawerClose: null,
    isMobile: null,
  };

  //@ts-ignore
  return <DrawerPresenter {...props}/>
}
export const OpenMobile = () => {
  const theme = useTheme()
  const props = {
    theme: theme,
    appState: {
      isSetting: false,
      isDrawerOpen: true,
    },
    dispatchAppState: null,
    handleOpenArticleEditor: null,
    handleOpenFooterItemEditor: null,
    handleSubmitPassword: null,
    handleOnSingOut: null,
    // open: true,
    handleDrawerOpen: null,
    handleDrawerClose: null,
    isMobile: true,
  };

  //@ts-ignore
  return <DrawerPresenter {...props}/>
}
export const OpenIsSetting = () => {
  const theme = useTheme()
  const props = {
    theme: theme,
    appState: {
      isSetting: true,
      isDrawerOpen: true,
    },
    dispatchAppState: null,
    handleOpenArticleEditor: null,
    handleOpenFooterItemEditor: null,
    handleSubmitPassword: null,
    handleOnSingOut: null,
    // open: true,
    handleDrawerOpen: null,
    handleDrawerClose: null,
    isMobile: null,
  };

  //@ts-ignore
  return <DrawerPresenter {...props}/>
}