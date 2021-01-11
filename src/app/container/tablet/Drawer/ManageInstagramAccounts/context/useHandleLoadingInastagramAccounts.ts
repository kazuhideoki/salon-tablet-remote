import React from 'react';
import { isLoadingInstagramAccounts } from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';

export const useHandleLoadingInstagramAccounts = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingInstagramAccounts(value));
  };
};
