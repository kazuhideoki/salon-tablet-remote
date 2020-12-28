import React from 'react'
import { InstagramContext } from '../../../../Store/instagram/Context';
import { Store } from '../../../../Store/Store';

export const useOpenInstagramModal = () => {
  const { dispatchAppState} = React.useContext(Store)
  const { instagramMedias } = React.useContext(InstagramContext);

  
  return (key: number) => {
    const instagramMedia = instagramMedias.data[key]
    dispatchAppState({
      type: "OPEN_INSTAGRAM_MEDIA_MODAL",
      payload: instagramMedia,
    });
  }
}