import React from 'react';
import { UserInfoContext } from '../../../../../stores/userInfo/Context';

export const useStateMangeTheme = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const { selected_theme, theme_color, show_article_type } = userInfo;

  return {
    selected_theme,
    theme_color,
    show_article_type,
  };
};
