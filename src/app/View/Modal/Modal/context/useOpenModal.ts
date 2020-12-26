import React from 'react'
import { Store } from '../../../../Store/Store';
import { TSetModal } from '../../../../Store/Types';
export const useOpenModal = () => {
  const { dispatchAppState } = React.useContext(Store);

  return (name: TSetModal) => {
    dispatchAppState({ type: "OPEN_MODAL", payload: name });
  };
}