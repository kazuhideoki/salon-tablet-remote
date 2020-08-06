import React from "react";
import {
  Store,
} from "../../Store/Store";
import { apiFooterItemsGet } from "../../../pages/api/footer_items/get";

export const useGetFooterItems = () => {
  const { dispatchAppState, appState } = React.useContext(Store);

  return async () => {
    const data = await apiFooterItemsGet(appState.userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
    } else {
      dispatchAppState({
        type: "SET_FOOTER_ITEMS",
        payload: data,
      });
    }
  };
};
