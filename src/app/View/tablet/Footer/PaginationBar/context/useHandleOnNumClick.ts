import React from 'react'
import { useGetArticles } from "../../../../../ActionCreator/articles/useGetArticles/useGetArticles";
import { AppStateContext } from '../../../../../Store/appState/Context';

export const useHandleOnNumClick = () => {
  const { appState } = React.useContext(AppStateContext);
  const { isSetting } = appState

  const getArticles = useGetArticles();

  return (num) => {
    getArticles(isSetting, num);
  };
}