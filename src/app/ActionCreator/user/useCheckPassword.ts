import React from "react";
import { Store } from "../../Store/Store";
import {
  T_user_id,
} from "../../Store/Types";
import { T_check_password } from "../../../pages/api/user_info/check_password";

export const useCheckPassword = () => {
  const { dispatchAppState, dispatchUserInfo, userInfo } = React.useContext(
    Store
  );
  const { user_id } = userInfo;
  // const cipheredPassword = cipher(password);
  return async (password: string) => {
    const params: T_check_password = { user_id, password };

    const res = await fetch(
      `${location.protocol}//${location.host}/api/user_info/check_password`, //★要変更
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      return alert("チェックできませんでした");
    } else {

      return data;
    }
  };
};
