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
  themes: null,
  handleDrawerCloseKeepIsSetting: null,
  closeDrawerTapMain: null,
  handleOnUpDateFooterIcon: null,
  deleteItem: null,
};

export const Close = () => {
  function test() {
    const today = new Date();

    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    
    // Browser.msgBox();
    console.log(year + '年' + month + '月' + day + '日');
    
  }
  test()

  const theme = useTheme()
  const themes = useThemeArgs("medium");

  return <DrawerPresenter {...props} theme={theme} themes={themes} />;
}
export const Open = () => {
  const theme = useTheme()
  const themes = useThemeArgs("medium");

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
    />
  );
}
export const OpenMobile = () => {
  const theme = useTheme()
  const themes = useThemeArgs("medium");

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isMobile={true}
      themes={useThemeArgs("medium")}
    />
  );
}
export const OpenIsSetting = () => {
  const theme = useTheme()
  const themes = useThemeArgs("medium");

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isSetting={true}
    />
  );
}
export const OpenIsSettingMobile = () => {
  const theme = useTheme()
  const themes = useThemeArgs("medium");

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isSetting={true}
      isMobile={true}
    />
  );
}