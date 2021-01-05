import React from 'react';
import { isLoadingMain } from '../../../../store/appState/actions';
import { AppStateContext } from '../../../../store/appState/Context';

export const useHandleLoadingMain = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingMain(value));
  };
};
