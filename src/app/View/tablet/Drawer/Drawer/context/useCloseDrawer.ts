import React from "react";
import { closeDrawer } from "../../../../../Store/appState/actions";
import { AppStateContext } from "../../../../../Store/appState/Context";

export const useCloseDrawer = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    dispatchAppState(closeDrawer());
  };
};
