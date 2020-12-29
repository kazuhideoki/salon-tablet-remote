import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';
export const useHandleDrawerCloseKeepIsSetting = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  return () => {
    dispatchAppState({ type: "CLOSE_DRAWER" }); 
  };
}