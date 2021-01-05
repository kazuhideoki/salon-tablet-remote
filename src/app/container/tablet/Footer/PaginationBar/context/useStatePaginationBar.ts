import React from 'react';
import { AppStateContext } from '../../../../../store/appState/Context';
import { ArticlesContext } from '../../../../../store/articles/Context';
import { InstagramContext } from '../../../../../store/instagram/Context';
import { TagsContext } from '../../../../../store/tags/Context';

export const useStatePaginationBar = () => {
  const { dispatchAppState, appState } = React.useContext(AppStateContext);
  const { paginationParams } = React.useContext(ArticlesContext);
  const { instagramAccounts, instagramMedias } = React.useContext(
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
    instagramMedias,
    paginationParams,
    selectedArticlesTags,
    selectedInstagramAccount,
    isShowInstagram,
  };
};
