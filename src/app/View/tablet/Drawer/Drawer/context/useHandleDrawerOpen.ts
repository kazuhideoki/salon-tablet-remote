import React from "react";
import { openDrawer } from "../../../../../Store/appState/actions";
import { AppStateContext } from "../../../../../Store/appState/Context";

export const useHandleDrawerOpen = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => dispatchAppState(openDrawer());
}
