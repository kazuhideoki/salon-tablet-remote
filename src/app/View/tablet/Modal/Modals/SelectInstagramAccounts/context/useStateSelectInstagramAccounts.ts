import React from 'react'
import { InstagramAccountsContext } from '../../../../../../Store/instagramAccounts/Context';
import { Store } from '../../../../../../Store/Store';

export const useStateSelectInstagramAccounts = () => {
  const { appState } = React.useContext(Store);
  const { isSetting } = appState;
  const { instagramAccounts } = React.useContext(InstagramAccountsContext);


  return {
    instagramAccounts,
    isSetting,
  };
}