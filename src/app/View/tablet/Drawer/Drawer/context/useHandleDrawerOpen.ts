import React from "react";
import { AppStateContext } from "../../../../../Store/appState/Context";
export const useHandleDrawerOpen = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  return () => dispatchAppState({ type: "OPEN_DRAWER" });
}
