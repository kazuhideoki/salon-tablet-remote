import React from "react";
import { Store } from "../../Store/Store";
import {
  T_user_id,
} from "../../Store/Types";
import { T_user_info_check_password, apiUserInfoCheckPassword } from "../../../pages/api/user_info/check_password";

export const useCheckPassword = () => {
  const { appState } = React.useContext(Store);
  const { user_id } = appState.userInfo;
  // const cipheredPassword = cipher(password);
  return async (password: string) => {
    const params: T_user_info_check_password = { user_id, password };

    const data = await apiUserInfoCheckPassword(params);

    if (data.err === true) {
      return alert("チェックできませんでした");
    } else {

      return data;
    }
  };
};
