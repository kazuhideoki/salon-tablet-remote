import React from 'react';
import { isLoadingMain } from '../../../../stores/appState/actions';
import { AppStateContext } from '../../../../stores/appState/Context';

export const useHandleLoadingMain = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingMain(value));
  };
};
