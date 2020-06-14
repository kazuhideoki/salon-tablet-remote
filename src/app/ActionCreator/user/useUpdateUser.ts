import React from "react";
import {
  Store,
  T_user_name,
  T_user_id,
  T_shop_name,
  T_email,
} from "../../Store/Store";

type TUpdateUser = {
  user_id: T_user_id
  user_name: T_user_name
  shop_name: T_shop_name
  email: T_email
  password?: string
};
export const useUpdateUser = () => {
  const {
    dispatchAppState,
    // dispatchUser,
    userInfo,
  } = React.useContext(Store);
  const {user_id, user_name, shop_name, email } = userInfo

  return async (password: string) => {

    const params: TUpdateUser = {
      user_id: user_id,
      user_name: user_name,
      shop_name: shop_name,
      email: email,
      password: '',
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/articles/update`, //★要変更
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

      // dispatchUser({type: })
      dispatchAppState({ type: "CLOSE_MODAL" });

    }
  };
};
