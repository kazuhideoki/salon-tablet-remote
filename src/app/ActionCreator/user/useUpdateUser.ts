import React from "react";
import { Store } from "../../Store/Store";
import { apiUserInfoUpdate, T_user_info_update } from "../../../pages/api/user_info/update";

export type TUpdateUser = {
  name: string
  shopName: string
  email: string
  password: string
  isShowMobile: boolean
}

export const useUpdateUser = () => {
  const {
    dispatchAppState,
    appState,
  } = React.useContext(Store);
  const { user_id } = appState.userInfo

  // const cipheredPassword = cipher(password);
  return async (param: TUpdateUser) => {
    const columns = {
      user_id: user_id,
      user_name: param.name,
      shop_name: param.shopName,
      user_email: param.email,
      is_show_mobile_page: param.isShowMobile,
    };

    const params: T_user_info_update = {
      columns: columns,
      plainTextPassword: param.password,
    };

    const data = await apiUserInfoUpdate(params);
    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      dispatchAppState({
        type: "SET_USER_INFO",
        payload: columns,
      });
      alert("ユーザーデータを更新しました。");

    }
  };
};
