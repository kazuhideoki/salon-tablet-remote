import React from 'react'
import { useGetArticles } from "../../../../ActionCreator/articles/useGetArticles";
import { Store } from '../../../../Store/Store';

export const useHandleSwitchIsSetting = () => {
  const { appState } = React.useContext(Store);
  const getArticles = useGetArticles();

  return () => {
    getArticles(true, 1, appState.selectedArticlesTags, false);
  };
}