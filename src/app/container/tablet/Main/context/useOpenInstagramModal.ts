import React from 'react';
import {
  setInstagramMediaContent,
  setModal,
} from '../../../../store/appState/actions';
import { AppStateContext } from '../../../../store/appState/Context';
import { InstagramContext } from '../../../../store/instagram/Context';

export const useOpenInstagramModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { instagramMedias } = React.useContext(InstagramContext);

  return (key: number) => {
    const instagramMedia = instagramMedias.data[key];
    dispatchAppState(setInstagramMediaContent(instagramMedia));
    dispatchAppState(setModal('instagram_media_modal'));
  };
};
