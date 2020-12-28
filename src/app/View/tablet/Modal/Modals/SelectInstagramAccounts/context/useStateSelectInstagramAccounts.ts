import React from 'react'
import { InstagramContext } from '../../../../../../Store/instagram/Context';
import { Store } from '../../../../../../Store/Store';

export const useStateSelectInstagramAccounts = () => {
  const { appState } = React.useContext(Store);
  const { isSetting } = appState;
  const { instagramAccounts } = React.useContext(InstagramContext);


  return {
    instagramAccounts,
    isSetting,
  };
}