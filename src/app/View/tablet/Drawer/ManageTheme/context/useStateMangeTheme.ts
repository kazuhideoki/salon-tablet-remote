import React from 'react'
import { Store } from '../../../../../Store/Store';
import { UserInfoContext } from '../../../../../Store/userInfo/Context';

export const useStateMangeTheme = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const { selected_theme, theme_color, show_article_type } = userInfo;

  return {
    selected_theme,
    theme_color,
    show_article_type,
  };
}