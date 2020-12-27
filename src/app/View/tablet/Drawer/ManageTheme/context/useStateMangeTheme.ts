import React from 'react'
import { Store } from '../../../../../Store/Store';

export const useStateMangeTheme = () => {
  const { appState } = React.useContext(Store);
  const { selected_theme, theme_color, show_article_type } = appState.userInfo;

  return {
    selected_theme,
    theme_color,
    show_article_type,
  };
}