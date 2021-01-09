import React from 'react';
import { openDrawer } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';

export const useHandleDrawerOpen = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => dispatchAppState(openDrawer());
};
