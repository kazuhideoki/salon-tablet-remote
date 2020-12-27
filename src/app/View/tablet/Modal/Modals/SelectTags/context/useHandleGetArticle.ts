import React from 'react'
import { useGetArticles } from '../../../../../../ActionCreator/articles/useGetArticles';
import { Store } from '../../../../../../Store/Store';
export const useHandleGetArticle = (selectingTags: number[]
) => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const getArticles = useGetArticles()


  return () => {
    const isLoaded = getArticles(appState.isSetting, 1, selectingTags);
    if (isLoaded) {
      dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };
}