import React from 'react'
import { useGetArticles } from '../../../../../ActionCreator/articles/useGetArticles/useGetArticles';
import { AppStateContext } from '../../../../../Store/appState/Context';
import { useDrawerProps } from '../view/Drawer';
export const useHandleDrawerClose = () => {
  const getArticles = useGetArticles();
  const { appState } = React.useContext(AppStateContext);
  const { closeDrawer } = useDrawerProps()

  return () => {
    getArticles(false, 1, appState.selectedArticlesTags, false);
    closeDrawer()
  };
}