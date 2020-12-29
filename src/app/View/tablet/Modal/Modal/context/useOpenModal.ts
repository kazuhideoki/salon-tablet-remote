import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';
import { TSetModal } from '../../../../../Store/Types';
export const useOpenModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (name: TSetModal) => {
    dispatchAppState({ type: "OPEN_MODAL", payload: name });
  };
}