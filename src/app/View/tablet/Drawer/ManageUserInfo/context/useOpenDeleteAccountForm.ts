import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';

export const useOpenDeleteAccountForm = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => dispatchAppState({
    type: "OPEN_MODAL",
    payload: "delete_account_form",
  });
}