import React from "react";
import {
  Store,
} from "../../Store/Store";
import { apiFooterItemsGet } from "../../../pages/api/footer_items/get";

export const useGetFooterItems = () => {
  const { dispatchFooterItems, dispatchAppState, userInfo } = React.useContext(Store);

  return async () => {
    const data = await apiFooterItemsGet(userInfo.user_id)

    if (data.err === true) {
      alert("取得できませんでした");
    } else {
      dispatchFooterItems({
        type: "GET",
        payload: data,
      });
    }
  };
};
