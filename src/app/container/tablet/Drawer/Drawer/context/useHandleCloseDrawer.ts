import React from 'react';
import { useGetArticles } from '../../../../../hooks/articles/useGetArticles';
import { closeDrawer } from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';

export const useHandleCloseDrawer = (isGetArticle: boolean) => {
  const getArticles = useGetArticles();
  const { appState, dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    if (isGetArticle) {
      getArticles(false, 1, appState.selectedArticlesTags, false);
    }
    dispatchAppState(closeDrawer());
  };
};
