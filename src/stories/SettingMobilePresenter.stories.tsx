import React from 'react';
import { SettingMobilePresenter } from '../app/View/mobile/SettingMobile';
import { useThemeArgs } from '../app/Store/ThemeContext';
import { samplefooterItems } from './lib/sampleFooterItems';
import { TUseDrawerProps } from '../app/View/Drawer/Drawer';
export default {
  title: "mobile/SettingMobile",
  component: SettingMobilePresenter,
};

const props: TUseDrawerProps = {
  theme: null,
  dispatchAppState: null,
  handleSwitchIsSetting: null,
  handleOnSingOut: null,
  handleDrawerClose: null,
  isMobile: null,
  pass: null,
  setPass: null,
  themes: null,
  isSetting: false,
  isPublicPage: false,
  isDrawerOpen: false,
  footerItems: samplefooterItems,
  handleDrawerCloseKeepIsSetting: null,
  closeDrawerTapMain: null,
  handleOnUpDateFooterIcon: null,
  deleteItem: null,
  isClicked: null,
};

export const Normal = () => {

  return <SettingMobilePresenter {...props} themes={useThemeArgs("medium")} />;
}