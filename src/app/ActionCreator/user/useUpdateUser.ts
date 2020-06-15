import React from "react";
import {
  Store,
  T_user_name,
  T_user_id,
  T_shop_name,
  T_user_email,
  T_setting_password,
} from "../../Store/Store";

export type TUpdateUserInfo = {
  name: string
  shopName: string
  email: string
  password: string
}

export type T_update_user = {
  user_id: T_user_id;
  user_name: T_user_name;
  shop_name: T_shop_name;
  user_email: T_user_email;
  setting_password: T_setting_password;
};
export const useUpdateUser = () => {
  const {
    dispatchAppState,
    dispatchUserInfo,
    userInfo,
  } = React.useContext(Store);
  const {user_id} = userInfo

  return async (values: TUpdateUserInfo) => {
    const params: T_update_user = {
      user_id: user_id,
      user_name: values.name,
      shop_name: values.shopName,
      user_email: values.email,
      setting_password: values.password,
    };
    console.log("useUpdateUserのparamsは " + params);
    

    const res = await fetch(
      `${location.protocol}//${location.host}/api/user_info/update`, //★要変更
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      dispatchUserInfo({ type: "SET_USER_DATA", payload: values });
      alert("ユーザーデータを更新しました。");
      // ↓modalを閉じるとTextFieldの値をうまく保持できない
      // dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };
};
