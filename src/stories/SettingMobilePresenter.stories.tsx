import React from 'react';
import { SettingMobilePresenter } from '../app/View/mobile/SettingMobile';
export default {
  title: 'SettingMobilePresenter',
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
  handleOpenFeedback: null,
  handleOnSingOut: null,
  handleDrawerOpen: null,
  handleDrawerClose: null,
  isMobile: null,
};

export const Normal = () => {

  return (
    <SettingMobilePresenter {...props}/>
  )
}