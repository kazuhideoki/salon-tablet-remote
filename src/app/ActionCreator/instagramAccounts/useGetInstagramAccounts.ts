import React from "react";
import { apiInstagramAccountsGet } from "../../../pages/api/instagram_accounts/get";
import { InstagramContext } from "../../Store/instagram/Context";
import { setAccounts } from "../../Store/instagram/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useManageInstagramAccountsProps } from "../../View/tablet/Drawer/ManageInstagramAccounts/view/ManageInstagmaAccounts";
import { isLoadingInstagramAccounts } from "../../Store/appState/actions";

export const useGetInstagramAccounts = () => {
  const { dispatchAppState } = React.useContext(
    AppStateContext
  );
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchInstagram } = React.useContext(InstagramContext);

  return async () => {

    dispatchAppState(isLoadingInstagramAccounts(true))

    try {
      const data = await apiInstagramAccountsGet(userInfo.user_id);
      dispatchAppState(isLoadingInstagramAccounts(false));
      dispatchInstagram(setAccounts(data))
    } catch (err) {
      alert("取得できませんでした");
      dispatchAppState(isLoadingInstagramAccounts(false));

    }
  }
};
