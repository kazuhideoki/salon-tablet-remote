import React from 'react'
import { useGetArticles } from '../../../../Main/context/lib/useGetArticles';
import { AppStateContext } from '../../../../../../Store/appState/Context';

export const useHandleGetArticle = (selectingTags: number[]
) => {
  const { appState } = React.useContext(AppStateContext);
  const getArticles = useGetArticles()

  return () => {
    getArticles(appState.isSetting, 1, selectingTags);
  };

}