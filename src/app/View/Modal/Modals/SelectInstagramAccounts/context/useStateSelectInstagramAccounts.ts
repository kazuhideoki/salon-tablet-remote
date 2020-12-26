import React from 'react'
import { Store } from '../../../../../Store/Store';

export const useStateSelectInstagramAccounts = () => {
  const { appState } = React.useContext(Store);
  const { instagramAccounts, isSetting } = appState;

  return {
    instagramAccounts,
    isSetting,
  };
}