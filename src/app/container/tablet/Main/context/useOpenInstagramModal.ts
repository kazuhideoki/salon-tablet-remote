import React from 'react';
import {
  setInstagramMediaContent,
  setModal,
} from '../../../../stores/appState/actions';
import { AppStateContext } from '../../../../stores/appState/Context';
import { InstagramContext } from '../../../../stores/instagram/Context';

export const useOpenInstagramModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { instagramMediaObject } = React.useContext(InstagramContext);

  return (key: number) => {
    const instagramMedia = instagramMediaObject.data[key];
    dispatchAppState(setInstagramMediaContent(instagramMedia));
    dispatchAppState(setModal('instagram_media_modal'));
  };
};
