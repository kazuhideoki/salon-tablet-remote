import React from 'react'
import { useGetArticles } from '../../../../../../ActionCreator/articles/useGetArticles/useGetArticles';
import { AppStateContext } from '../../../../../../Store/appState/Context';
export const useHandleGetArticle = (selectingTags: number[]
) => {
  const { dispatchAppState, appState } = React.useContext(AppStateContext);
  const getArticles = useGetArticles()


  return () => {
    const isLoaded = getArticles(appState.isSetting, 1, selectingTags);
    if (isLoaded) {
      dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };
}