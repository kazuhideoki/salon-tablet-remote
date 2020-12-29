import React from "react";
import { apiInstagramAccountsGet } from "../../../pages/api/instagram_accounts/get";
import { InstagramContext } from "../../Store/instagram/Context";
import { setAccounts } from "../../Store/instagram/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useManageInstagramAccountsProps } from "../../View/tablet/Drawer/ManageInstagramAccounts/view/ManageInstagmaAccounts";

export const useGetInstagramAccounts = () => {
  const { dispatchAppState } = React.useContext(
    AppStateContext
  );
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchInstagram } = React.useContext(InstagramContext);
  const { handleLoadingInstagramAccounts } = useManageInstagramAccountsProps()

  return async () => {

    handleLoadingInstagramAccounts(true)

    const data = await apiInstagramAccountsGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      handleLoadingInstagramAccounts(false)
    } else {
      dispatchAppState({
        type: "SET_INSTAGRAM_ACCOUNTS",
      });
      dispatchInstagram(setAccounts(data))
    }
  };
};
