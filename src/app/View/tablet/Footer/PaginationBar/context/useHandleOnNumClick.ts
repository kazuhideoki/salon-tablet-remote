import React from 'react'
import { useGetArticles } from "../../../Main/context/lib/useGetArticles";
import { AppStateContext } from '../../../../../Store/appState/Context';

export const useHandleOnNumClick = () => {
  const { appState } = React.useContext(AppStateContext);
  const { isSetting } = appState

  const getArticles = useGetArticles();

  return (num) => {
    getArticles(isSetting, num);
  };
}