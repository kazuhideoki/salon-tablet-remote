import React from 'react';
import { ManageThemePresenter, useManageTheme } from '../app/View/Drawer/ManageTheme/ManageTheme';
export default {
  title: "Drawer/ManageTheme",
  component: ManageThemePresenter,
};

export const Normal = () => {
  const props = {
    selected_theme: null,
    color: null,
    handleChangeThemeColor: null,
    font1: null,
    handleChangeThemeFont: null,
    show_article_type: null,
    handleChange: null,
    handleChangeShowArticleType: null,
  };

  return (
    <ManageThemePresenter {...props}/>
  )
}