import React from 'react';
import { SettingMobilePresenter } from '../app/View/mobile/SettingMobile';
import { themeArgs } from '../app/Store/ThemeContext';
export default {
  title: "mobile/SettingMobile",
  component: SettingMobilePresenter,
};

const props = {
  theme: null,
  appState: null,
  dispatchAppState: null,
  handleOpenArticleEditor: null,
  handleOpenFooterItemEditor: null,
  handleSubmitPassword: null,
  handleSwitchIsSetting: null,
  handleOpenTagsManage: null,
  handleOpenFeedback: null,
  handleOnSingOut: null,
  handleDrawerOpen: null,
  handleDrawerClose: null,
  isMobile: null,
  pass: null,
  setPass: null,
  themes: themeArgs(false),
};

export const Normal = () => {

  return (
    <SettingMobilePresenter {...props}/>
  )
}