import React from "react";
import {
  Store,
  T_user_name,
  T_user_id,
  T_shop_name,
  T_user_email,
} from "../../Store/Store";

export type T_update_user = {
  columns: {
    user_id: T_user_id;
    user_name: T_user_name;
    shop_name: T_shop_name;
    user_email: T_user_email;
  },
  plainTextPassword: string
};

type TUpdateUser = {
  name: string
  shopName: string
  email: string
  password: string
}

export const useUpdateUser = () => {
  const {
    dispatchAppState,
    dispatchUserInfo,
    userInfo,
  } = React.useContext(Store);
  const {user_id} = userInfo

  // const cipheredPassword = cipher(password);
  return async (param: TUpdateUser) => {
    const params: T_update_user = {
      columns: {
        user_id: user_id,
        user_name: param.name,
        shop_name: param.shopName,
        user_email: param.email,
      },
      plainTextPassword: param.password,
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
      dispatchUserInfo({
        type: "SET_USER_INFO",
        payload: {
          user_id: user_id,
          user_name: param.name,
          shop_name: param.shopName,
          user_email: param.email,
        },
      });
      dispatchAppState({ type: "CLOSE_MODAL" });
      alert("ユーザーデータを更新しました。");
      // ↓modalを閉じるとTextFieldの値をうまく保持できない
      // そもそも必要ない
    }
  };
};
