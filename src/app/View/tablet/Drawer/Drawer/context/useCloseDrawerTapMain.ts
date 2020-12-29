import React from "react";
import { AppStateContext } from "../../../../../Store/appState/Context";
export const useCloseDrawerTapMain = () => {
  const { dispatchAppState, appState } = React.useContext(AppStateContext);

  return () => {
    dispatchAppState({ type: "CLOSE_DRAWER" });
  };
};
