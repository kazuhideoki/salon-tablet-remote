import React from 'react';
import { useGetArticles } from '../../../../../hooks/articles/useGetArticles';
import { AppStateContext } from '../../../../../stores/appState/Context';

export const useHandleSwitchIsSetting = () => {
  const { appState } = React.useContext(AppStateContext);
  const getArticles = useGetArticles();

  return () => {
    getArticles(true, 1, appState.selectedArticlesTags, false);
  };
};
