import React from 'react';
import { isLoadingInstagramAccounts } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';

export const useHandleLoadingInstagramAccounts = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingInstagramAccounts(value));
  };
};
