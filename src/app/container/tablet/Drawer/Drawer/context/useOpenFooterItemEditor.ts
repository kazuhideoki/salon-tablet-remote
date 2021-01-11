import React from 'react';
import {
  createFooterItem,
  setModal,
} from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';
export const useOpenFooterItemEditor = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    dispatchAppState(createFooterItem());
    dispatchAppState(setModal('edit_footer_item'));
  };
};
