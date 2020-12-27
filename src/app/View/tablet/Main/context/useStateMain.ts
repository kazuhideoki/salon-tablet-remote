import React from 'react'
import { Store } from '../../../../Store/Store';
export const useStateMain = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const {
    articles,
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
    loading,
    isShowInstagram,
    userInfo,
    isSetting,
  };
}