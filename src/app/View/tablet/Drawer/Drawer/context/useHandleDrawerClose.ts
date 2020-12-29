import React from 'react'
import { useGetArticles } from '../../../../../ActionCreator/articles/useGetArticles/useGetArticles';
import { AppStateContext } from '../../../../../Store/appState/Context';
export const useHandleDrawerClose = () => {
  const getArticles = useGetArticles();
  const { dispatchAppState, appState } = React.useContext(AppStateContext);

  return () => {
    getArticles(false, 1, appState.selectedArticlesTags, false);
    dispatchAppState({ type: "CLOSE_DRAWER" }); // getArticlesまえにdispatchされた値は,apiに送信されるときに反映されない。→get終わってから反映
  };
}