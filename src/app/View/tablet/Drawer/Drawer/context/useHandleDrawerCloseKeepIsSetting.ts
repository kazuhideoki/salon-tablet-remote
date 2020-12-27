import React from 'react'
import { Store } from '../../../../../Store/Store';
export const useHandleDrawerCloseKeepIsSetting = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  return () => {
    dispatchAppState({ type: "CLOSE_DRAWER" }); 
  };
}