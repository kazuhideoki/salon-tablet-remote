import React from "react";
import { isLoadingInstagramAccounts } from "../../../../../Store/appState/actions";
import { AppStateContext } from "../../../../../Store/appState/Context";

export const useHandleLoadingInstagramAccounts = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingInstagramAccounts(value));
  };
};
