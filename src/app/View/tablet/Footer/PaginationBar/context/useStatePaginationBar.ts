import React from 'react'
import { ArticlesContext } from '../../../../../Store/articles/Context';
import { Store } from '../../../../../Store/Store';
import { TagsContext } from '../../../../../Store/tags/Context';

export const useStatePaginationBar = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { paginationParams } = React.useContext(ArticlesContext);
  const { tags } = React.useContext(TagsContext);
  const {
    isSetting,
    instagramAccounts,
    instagramMedias,
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