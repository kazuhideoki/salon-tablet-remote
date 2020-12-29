import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';
import { ArticlesContext } from '../../../../../Store/articles/Context';
import { InstagramContext } from "../../../../../Store/instagram/Context";
import { TagsContext } from '../../../../../Store/tags/Context';

export const useStatePaginationBar = () => {
  const { dispatchAppState, appState } = React.useContext(AppStateContext);
  const { paginationParams } = React.useContext(ArticlesContext);
  const { instagramAccounts, instagramMedias } = React.useContext(InstagramContext);
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


}