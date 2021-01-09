import React from 'react';
import { useGetArticles } from '../../../../../../hooks/articles/useGetArticles';
import { AppStateContext } from '../../../../../../stores/appState/Context';

export const useHandleGetArticle = (selectingTags: number[]) => {
  const { appState } = React.useContext(AppStateContext);
  const getArticles = useGetArticles();

  return () => {
    getArticles(appState.isSetting, 1, selectingTags);
  };
};
