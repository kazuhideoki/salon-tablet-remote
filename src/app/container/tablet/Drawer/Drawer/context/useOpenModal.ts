import React from 'react';
import { setModal } from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';
import { SetModal } from '../../../../../../util/interface/Interface';
export const useOpenModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: SetModal) => {
    dispatchAppState(setModal(value));
  };
};
