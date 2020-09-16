import React from 'react';
import { ManageThemePresenter, useManageTheme } from '../app/View/Drawer/ManageTheme/ManageTheme';
export default {
  title: "Drawer/ManageTheme",
  component: ManageThemePresenter,
};



export const Normal = () => {
  const props = useManageTheme()

  return (
    <ManageThemePresenter {...props}/>
  )
}