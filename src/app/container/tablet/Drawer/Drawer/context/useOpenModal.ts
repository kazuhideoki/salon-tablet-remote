import React from 'react';
import { setModal } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';
import { TSetModal } from '../../../../../../util/interface/Interface';
export const useOpenModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: TSetModal) => {
    dispatchAppState(setModal(value));
  };
};
