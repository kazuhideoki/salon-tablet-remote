import React from 'react';
import { DrawerPresenter, TUseDrawerProps } from '../app/View/Drawer/Drawer';
import { useTheme } from '@material-ui/core';
import { samplefooterItems } from './lib/sampleFooterItems';
import { themeArgs } from '../app/Store/ThemeContext';
export default {
  title: "Drawer/Drawer",
  component: DrawerPresenter,
};


const props: TUseDrawerProps = {
  theme: null,
  isSetting: false,
  isPublicPage: false,
  isDrawerOpen: false,
  dispatchAppState: null,
  handleSubmitPassword: null,
  handleOnSingOut: null,
  handleDrawerClose: null,
  isMobile: false,
  footerItems: samplefooterItems,
  handleSwitchIsSetting: null,
  pass: null,
  setPass: null,
  themes: themeArgs(false),
};

export const Close = () => {
  const theme = useTheme()

  return <DrawerPresenter {...props} theme={theme}/>
}
export const Open = () => {
  const theme = useTheme()

  return <DrawerPresenter {...props} theme={theme} isDrawerOpen={true}/>;
}
export const OpenMobile = () => {
  const theme = useTheme()

  return <DrawerPresenter {...props} theme={theme} isDrawerOpen={true} isMobile={true} themes={themeArgs(true)}/>;
}
export const OpenIsSetting = () => {
  const theme = useTheme()

  return <DrawerPresenter {...props} theme={theme} isDrawerOpen={true} isSetting={true}/>;
}
export const OpenIsSettingMobile = () => {
  const theme = useTheme()

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      isDrawerOpen={true}
      isSetting={true}
      isMobile={true}
      themes={themeArgs(true)}
    />
  );
}