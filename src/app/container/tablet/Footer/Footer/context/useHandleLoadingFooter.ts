import React from 'react';
import { isLoadingFooter } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';

export const useHandleLoadingFooter = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingFooter(value));
  };
};
