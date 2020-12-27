import React from "react";
import { Store } from "../../../../../Store/Store";
export const useCloseDrawerTapMain = () => {
  const { dispatchAppState, appState } = React.useContext(Store);

  return () => {
    dispatchAppState({ type: "CLOSE_DRAWER" });
  };
};
