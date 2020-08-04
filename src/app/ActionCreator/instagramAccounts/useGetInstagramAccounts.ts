import React from "react";
import { Store } from "../../Store/Store";
import { apiInstagramAccountsGet } from "../../../pages/api/instagram_accounts/get";

export const useGetInstagramAccounts = () => {
  const { dispatchInstagramAccounts, dispatchAppState, userInfo } = React.useContext(
    Store
  );

  return async () => {

    const data = await apiInstagramAccountsGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
    } else {
      dispatchInstagramAccounts({
        type: "SET_INSTAGRAM_ACCOUNTS",
        payload: data,
      });
    }
  };
};
