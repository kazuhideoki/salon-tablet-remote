import React from 'react'
import { Store } from '../../../../../Store/Store';

export const useStatePaginationBar = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const {
    isSetting,
    tags,
    instagramAccounts,
    instagramMedias,
    paginationParams,
    selectedArticlesTags,
    selectedInstagramAccount,
    isShowInstagram,
  } = appState;

  return {
    dispatchAppState,
    isSetting,
    tags,
    instagramAccounts,
    instagramMedias,
    paginationParams,
    selectedArticlesTags,
    selectedInstagramAccount,
    isShowInstagram,
  };


}