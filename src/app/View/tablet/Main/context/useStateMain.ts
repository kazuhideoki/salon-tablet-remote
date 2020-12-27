import React from 'react'
import { ArticleContext } from '../../../../Store/articles/Context';
import { Store } from '../../../../Store/Store';
export const useStateMain = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const { articles } = React.useContext(ArticleContext)
  const {
    tags,
    instagramMedias,
    loading,
    isShowInstagram,
    userInfo,
    isSetting,
  } = appState;

  return {
    dispatchAppState,
    articles,
    tags,
    instagramMedias,
    loading: loading.main,
    isShowInstagram,
    userInfo,
    isSetting,
  };
}