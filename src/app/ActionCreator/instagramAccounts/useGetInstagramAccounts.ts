import React from "react";
import { Store } from "../../Store/Store";
import { apiInstagramAccountsGet } from "../../../pages/api/instagram_accounts/get";

export const useGetInstagramAccounts = () => {
  const { dispatchAppState, appState } = React.useContext(
    Store
  );

  return async () => {

    dispatchAppState({type: "ON_IS_LOADING_INSTAGRAM_ACCOUNTS"})

    const data = await apiInstagramAccountsGet(appState.userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_INSTAGRAM_ACCOUNTS" });
    } else {
      dispatchAppState({
        type: "SET_INSTAGRAM_ACCOUNTS",
        payload: data,
      });
    }
  };
};
