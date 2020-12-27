import React from 'react'
import { useGetArticles } from '../../../../../ActionCreator/articles/useGetArticles/useGetArticles';
import { Store } from '../../../../../Store/Store';
export const useHandleDrawerClose = () => {
  const getArticles = useGetArticles();
  const { dispatchAppState, appState } = React.useContext(Store);

  return () => {
    getArticles(false, 1, appState.selectedArticlesTags, false);
    dispatchAppState({ type: "CLOSE_DRAWER" }); // getArticlesまえにdispatchされた値は,apiに送信されるときに反映されない。→get終わってから反映
  };
}