import React from 'react';
import { AppStateContext } from '../../../../../../store/appState/Context';
import { InstagramContext } from '../../../../../../store/instagram/Context';

export const useStateSelectInstagramAccounts = () => {
  const { appState } = React.useContext(AppStateContext);
  const { isSetting } = appState;
  const { instagramAccounts } = React.useContext(InstagramContext);

  return {
    instagramAccounts,
    isSetting,
  };
};
