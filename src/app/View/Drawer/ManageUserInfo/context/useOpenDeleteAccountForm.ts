import React from 'react'
import { Store } from '../../../../Store/Store';

export const useOpenDeleteAccountForm = () => {
  const { dispatchAppState } = React.useContext(Store);

  return () => dispatchAppState({
    type: "OPEN_MODAL",
    payload: "delete_account_form",
  });
}