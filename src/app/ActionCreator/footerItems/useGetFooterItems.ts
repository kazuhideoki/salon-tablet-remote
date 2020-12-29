import React from "react";
import {
  Store,
} from "../../Store/Store";
import { apiFooterItemsGet } from "../../../pages/api/footer_items/get";
import { FooterItemsContext } from "../../Store/footerItems/Context";
import { set } from "../../Store/footerItems/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";

export const useGetFooterItems = () => {
  const { dispatchAppState } = React.useContext(Store);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchFooterItems } = React.useContext(FooterItemsContext);


  return async () => {

    dispatchAppState({type: "ON_IS_LOADING_FOOTER"})

    const data = await apiFooterItemsGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchAppState({
        type: "SET_FOOTER_ITEMS",
        payload: data,
      });
      dispatchFooterItems(set(data))
    }
  };
};
