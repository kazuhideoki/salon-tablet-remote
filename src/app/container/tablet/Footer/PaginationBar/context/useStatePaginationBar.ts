import React from 'react';
import { AppStateContext } from '../../../../../stores/appState/Context';
import { ArticlesContext } from '../../../../../stores/articles/Context';
import { InstagramContext } from '../../../../../stores/instagram/Context';
import { TagsContext } from '../../../../../stores/tags/Context';

export const useStatePaginationBar = () => {
  const { dispatchAppState, appState } = React.useContext(AppStateContext);
  const { paginationParams } = React.useContext(ArticlesContext);
  const { instagramAccounts, instagramMediaObject } = React.useContext(
    InstagramContext
  );
  const { tags } = React.useContext(TagsContext);
  const {
    isSetting,
    selectedArticlesTags,
    selectedInstagramAccount,
    isShowInstagram,
  } = appState;

  return {
    dispatchAppState,
    isSetting,
    tags,
    instagramAccounts,
    instagramMediaObject,
    paginationParams,
    selectedArticlesTags,
    selectedInstagramAccount,
    isShowInstagram,
  };
};
