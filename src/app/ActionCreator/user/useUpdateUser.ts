import React from "react";
import {
  Store,
  T_user_name,
  T_user_id,
  T_shop_name,
  T_user_email,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";

export type T_update_user = {
  columns: {
    user_id: T_user_id;
    user_name: T_user_name;
    shop_name: T_shop_name;
    user_email: T_user_email;
  },
  plainTextPassword: string
};


export const useUpdateUser = () => {
  const {
    dispatchAppState,
    dispatchUserInfo,
    userInfo,
  } = React.useContext(Store);
  const {user_id} = userInfo
  const {
    name,
    setName,
    shopName,
    setShopName,
    email,
    setEmail,
    password,
    setPassword,
  } = React.useContext(EditorContext);
  // const cipheredPassword = cipher(password);
  return async () => {
    const params: T_update_user = {
      columns: {
        user_id: user_id,
        user_name: name,
        shop_name: shopName,
        user_email: email,
      },
      plainTextPassword: password,
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
          user_name: name,
          shop_name: shopName,
          user_email: email,
        },
      });
      dispatchAppState({ type: "CLOSE_MODAL" });
      alert("ユーザーデータを更新しました。");
      // ↓modalを閉じるとTextFieldの値をうまく保持できない
      // そもそも必要ない
    }
  };
};
