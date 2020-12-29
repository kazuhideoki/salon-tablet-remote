import React from 'react'
import { useGetArticles } from "../../../../../ActionCreator/articles/useGetArticles/useGetArticles";
import { AppStateContext } from '../../../../../Store/appState/Context';
import { Store } from '../../../../../Store/Store';

export const useHandleSwitchIsSetting = () => {
  const { appState } = React.useContext(AppStateContext);
  const getArticles = useGetArticles();

  return () => {
    getArticles(true, 1, appState.selectedArticlesTags, false);
  };
}