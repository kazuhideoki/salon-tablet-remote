import React from "react";
import { Store } from "../../Store/Store";
import { apiInstagramAccountsGet } from "../../../pages/api/instagram_accounts/get";
import { InstagramContext } from "../../Store/instagram/Context";
import { setAccounts } from "../../Store/instagram/actions";

export const useGetInstagramAccounts = () => {
  const { dispatchAppState, appState } = React.useContext(
    Store
  );
  const { dispatchInstagram } = React.useContext(InstagramContext);

  return async () => {

    dispatchAppState({type: "ON_IS_LOADING_INSTAGRAM_ACCOUNTS"})

    const data = await apiInstagramAccountsGet(appState.userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_INSTAGRAM_ACCOUNTS" });
    } else {
      dispatchAppState({
        type: "SET_INSTAGRAM_ACCOUNTS",
      });
      dispatchInstagram(setAccounts(data))
    }
  };
};
