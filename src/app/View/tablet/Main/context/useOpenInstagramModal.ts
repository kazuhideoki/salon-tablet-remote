import React from 'react'
import { setInstagramMediaContent, setModal } from '../../../../Store/appState/actions';
import { AppStateContext } from '../../../../Store/appState/Context';
import { InstagramContext } from '../../../../Store/instagram/Context';

export const useOpenInstagramModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  const { instagramMedias } = React.useContext(InstagramContext);
  
  return (key: number) => {
    const instagramMedia = instagramMedias.data[key]
    dispatchAppState(setInstagramMediaContent(instagramMedia))
    dispatchAppState(setModal("instagram_media_modal"));
  }
}