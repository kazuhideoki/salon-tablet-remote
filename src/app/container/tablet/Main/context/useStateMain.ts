import React from 'react';
import { AppStateContext } from '../../../../stores/appState/Context';
import { ArticlesContext } from '../../../../stores/articles/Context';
import { InstagramContext } from '../../../../stores/instagram/Context';
import { TagsContext } from '../../../../stores/tags/Context';
import { UserInfoContext } from '../../../../stores/userInfo/Context';
import { useOpenInstagramModal } from './useOpenInstagramModal';
export const useStateMain = () => {
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { articles } = React.useContext(ArticlesContext);
  const { tags } = React.useContext(TagsContext);
  const { instagramMediaObject } = React.useContext(InstagramContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { loading, isShowInstagram, isSetting } = appState;

  return {
    dispatchAppState,
    articles,
    tags,
    instagramMediaObject,
    loading: loading.main,
    isShowInstagram,
    userInfo,
    isSetting,
  };
};
