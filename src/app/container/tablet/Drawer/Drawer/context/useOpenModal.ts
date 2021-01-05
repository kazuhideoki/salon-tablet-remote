import React from 'react';
import { setModal } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';
import { SetModal } from '../../../../../../util/interface/Interface';
export const useOpenModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: SetModal) => {
    dispatchAppState(setModal(value));
  };
};
