import React from "react";
import { Store } from "../../Store/Store";

import { useGetInfoBar } from "./useGetInfoBar";
import {
  T_info_bar_update,
  apiInfoBarUpdate,
} from "../../../pages/api/info_bar/update";

export const useUpdateInfoBar = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const getInfoBar = useGetInfoBar();

  return async (params: T_info_bar_update) => {

    dispatchAppState({ type: "CLOSE_MODAL" });
    // dispatchAppState({ type: "ON_IS_LOADING_FOOTER" });

    const data = await apiInfoBarUpdate(params);

    if (data.err === true) {
      alert("更新できませんでした");
      // dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getInfoBar();
    }
  };
};
