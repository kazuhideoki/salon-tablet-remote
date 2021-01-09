import React from 'react';
import { AppStateContext } from '../../../../store/appState/Context';
import { ArticlesContext } from '../../../../store/articles/Context';
import { InstagramContext } from '../../../../store/instagram/Context';
import { TagsContext } from '../../../../store/tags/Context';
import { UserInfoContext } from '../../../../store/userInfo/Context';
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
