import React from 'react';
import { isLoadingFooter } from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';

export const useHandleLoadingFooter = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingFooter(value));
  };
};
