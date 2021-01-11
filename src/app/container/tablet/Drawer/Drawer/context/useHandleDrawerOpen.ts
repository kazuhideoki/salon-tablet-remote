import React from 'react';
import { openDrawer } from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';

export const useHandleDrawerOpen = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => dispatchAppState(openDrawer());
};
