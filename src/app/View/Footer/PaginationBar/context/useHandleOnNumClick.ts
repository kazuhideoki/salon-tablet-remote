import React from 'react'
import { useGetArticles } from "../../../../ActionCreator/articles/useGetArticles";
import { Store } from '../../../../Store/Store';

export const useHandleOnNumClick = () => {
  const { appState } = React.useContext(Store);
  const { isSetting } = appState

  const getArticles = useGetArticles();

  return (num) => {
    getArticles(isSetting, num);
  };
}