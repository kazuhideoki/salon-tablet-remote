import React from 'react';
import { SettingThemePresenter, useSettingTheme } from '../app/View/Drawer/SettingTheme';
export default {
  title: 'SettingThemePresenter',
  component: SettingThemePresenter,
};



export const Normal = () => {
  const props = useSettingTheme()

  return (
    <SettingThemePresenter {...props}/>
  )
}