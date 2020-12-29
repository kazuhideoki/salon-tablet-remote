import React from "react";
import { apiFooterItemsGet } from "../../../pages/api/footer_items/get";
import { FooterItemsContext } from "../../Store/footerItems/Context";
import { set } from "../../Store/footerItems/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useFooterProps } from "../../View/tablet/Footer/Footer/view/Footer";

export const useGetFooterItems = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchFooterItems } = React.useContext(FooterItemsContext);
  const { handleLoadingFooter } = useFooterProps()


  return async () => {

    handleLoadingFooter(true)

    const data = await apiFooterItemsGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      handleLoadingFooter(false)
    } else {
      handleLoadingFooter(false)
      dispatchFooterItems(set(data))
    }
  };
};
