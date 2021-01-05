import React from 'react';
import { closeDrawer } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';

export const useCloseDrawer = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    dispatchAppState(closeDrawer());
  };
};
