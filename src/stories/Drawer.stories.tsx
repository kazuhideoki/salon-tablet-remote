import React from 'react';
import { DrawerPresenter } from '../app/View/Drawer';
import { useTheme } from '@material-ui/core';
export default {
title: 'DrawerPresenter',
component: DrawerPresenter,
};



export const Close = () => {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const props = {
    theme: theme,
    appState: {
      isSetting: true,
    },
    dispatchAppState: null,
    handleOpenArticleEditor: null,
    handleOpenFooterItemEditor: null,
    handleSubmitPassword: null,
    handleOnSingOut: null,
    open: open,
    handleDrawerOpen: null,
    handleDrawerClose: null,
    isMobile: null,
  };

  //@ts-ignore
  return <DrawerPresenter {...props}/>
}
export const Open = () => {
  const [open, setOpen] = React.useState(true)
  const theme = useTheme()
  const props = {
    theme: theme,
    appState: {
      isSetting: false,
    },
    dispatchAppState: null,
    handleOpenArticleEditor: null,
    handleOpenFooterItemEditor: null,
    handleSubmitPassword: null,
    handleOnSingOut: null,
    open: open,
    handleDrawerOpen: null,
    handleDrawerClose: null,
    isMobile: null,
  };

  //@ts-ignore
  return <DrawerPresenter {...props}/>
}
export const OpenIsSetting = () => {
  const [open, setOpen] = React.useState(true)
  const theme = useTheme()
  const props = {
    theme: theme,
    appState: {
      isSetting: true,
    },
    dispatchAppState: null,
    handleOpenArticleEditor: null,
    handleOpenFooterItemEditor: null,
    handleSubmitPassword: null,
    handleOnSingOut: null,
    open: open,
    handleDrawerOpen: null,
    handleDrawerClose: null,
    isMobile: null,
  };

  //@ts-ignore
  return <DrawerPresenter {...props}/>
}