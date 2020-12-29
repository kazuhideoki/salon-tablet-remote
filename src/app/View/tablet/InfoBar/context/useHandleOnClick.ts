import React from "react";
import { AppStateContext } from "../../../../Store/appState/Context";

export const useHandleOnClick = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_info_bar" });
  };
}