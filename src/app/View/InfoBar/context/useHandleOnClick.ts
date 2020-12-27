import React from "react";
import { Store } from "../../../Store/Store";

export const useHandleOnClick = () => {
  const { dispatchAppState } = React.useContext(Store);

  return () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_info_bar" });
  };
}