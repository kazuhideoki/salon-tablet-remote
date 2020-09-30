import React from 'react';
import { DrawerPresenter, TUseDrawerProps } from '../app/View/Drawer/Drawer';
import { useTheme } from '@material-ui/core';
import { samplefooterItems } from './lib/sampleFooterItems';
import { useThemeArgs } from '../app/Store/ThemeContext';
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
  themes: useThemeArgs('medium'),
  handleDrawerCloseKeepIsSetting: null,
  closeDrawerTapMain: null,
  handleOnUpDateFooterIcon: null,
  deleteItem: null,
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

  return <DrawerPresenter {...props} theme={theme} isDrawerOpen={true} isMobile={true} themes={useThemeArgs('medium')}/>;
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
      themes={useThemeArgs('medium')}
    />
  );
}