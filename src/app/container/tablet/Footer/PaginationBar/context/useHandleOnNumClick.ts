import React from 'react';
import { useGetArticles } from '../../../../../hooks/articles/useGetArticles';
import { AppStateContext } from '../../../../../stores/appState/Context';

export const useHandleOnNumClick = () => {
  const { appState } = React.useContext(AppStateContext);
  const { isSetting } = appState;

  const getArticles = useGetArticles();

  return (num: number) => {
    getArticles(isSetting, num);
  };
};
