import React from 'react'
import { AppStateContext } from '../../../../Store/appState/Context';
import { InstagramContext } from '../../../../Store/instagram/Context';

export const useOpenInstagramModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  const { instagramMedias } = React.useContext(InstagramContext);

  
  return (key: number) => {
    const instagramMedia = instagramMedias.data[key]
    dispatchAppState({
      type: "OPEN_INSTAGRAM_MEDIA_MODAL",
      payload: instagramMedia,
    });
  }
}