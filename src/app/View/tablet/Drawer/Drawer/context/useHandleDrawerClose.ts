import React from 'react'
import { useGetArticles } from '../../../../../ActionCreator/articles/useGetArticles/useGetArticles';
import { closeDrawer } from '../../../../../Store/appState/actions';
import { AppStateContext } from '../../../../../Store/appState/Context';

export const useHandleDrawerClose = () => {
  const getArticles = useGetArticles();
  const { appState, dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    getArticles(false, 1, appState.selectedArticlesTags, false);
    dispatchAppState(closeDrawer())
  };
}