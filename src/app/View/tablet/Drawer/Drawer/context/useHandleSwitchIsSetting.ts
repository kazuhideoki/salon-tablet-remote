import React from 'react'
import { useGetArticles } from "../../../Main/context/lib/useGetArticles";
import { AppStateContext } from '../../../../../Store/appState/Context';

export const useHandleSwitchIsSetting = () => {
  const { appState } = React.useContext(AppStateContext);
  const getArticles = useGetArticles();

  return () => {
    getArticles(true, 1, appState.selectedArticlesTags, false);
  };
}