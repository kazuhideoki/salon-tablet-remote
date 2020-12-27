import React from "react";
import { Store } from "../../../../../Store/Store";
export const useHandleDrawerOpen = () => {
  const { dispatchAppState } = React.useContext(Store);
  return () => dispatchAppState({ type: "OPEN_DRAWER" });
}
