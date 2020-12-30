import React from 'react'
import { setInstagramMediaContent } from '../../../../Store/appState/actions';
import { AppStateContext } from '../../../../Store/appState/Context';
import { InstagramContext } from '../../../../Store/instagram/Context';
import { useDrawerProps } from '../../Drawer/Drawer/view/Drawer';

export const useOpenInstagramModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  const { instagramMedias } = React.useContext(InstagramContext);
  const { openModal } = useDrawerProps()
  
  return (key: number) => {
    const instagramMedia = instagramMedias.data[key]
    dispatchAppState(setInstagramMediaContent(instagramMedia))
    openModal("instagram_media_modal");
  }
}