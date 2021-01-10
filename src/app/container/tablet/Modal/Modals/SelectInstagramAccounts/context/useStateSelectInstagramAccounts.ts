import React from 'react';
import { AppStateContext } from '../../../../../../stores/appState/Context';
import { InstagramContext } from '../../../../../../stores/instagram/Context';

export const useStateSelectInstagramAccounts = () => {
  const { appState } = React.useContext(AppStateContext);
  const { isSetting } = appState;
  const { instagramAccounts } = React.useContext(InstagramContext);

  return {
    instagramAccounts,
    isSetting,
  };
};
