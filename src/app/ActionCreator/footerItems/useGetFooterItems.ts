import React from "react";
import { apiFooterItemsGet } from "../../../pages/api/footer_items/get";
import { FooterItemsContext } from "../../Store/footerItems/Context";
import { set } from "../../Store/footerItems/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { isLoadingFooter } from "../../Store/appState/actions";

export const useGetFooterItems = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchFooterItems } = React.useContext(FooterItemsContext);


  return async () => {

    dispatchAppState(isLoadingFooter(true))

    const data = await apiFooterItemsGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState(isLoadingFooter(false));
    } else {
      dispatchAppState(isLoadingFooter(false));
      dispatchFooterItems(set(data))
    }
  };
};
