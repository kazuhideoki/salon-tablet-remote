import React from "react";
import { Store } from "../../Store/Store";
import { apiUserInfoUpdate, T_user_info_update } from "../../../pages/api/user_info/update";
import { updatePassword } from "../../../lib/auth/updatePassword";
import { useAuth } from "../../../lib/auth/AuthProvider";

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
  const {user} = useAuth()

  return async (param: TUpdateUser) => {
    const params: T_user_info_update = {
      user_id: user_id,
      user_name: param.name,
      shop_name: param.shopName,
      user_email: param.email,
      is_generate_public_page: param.isShowMobile,
    };

    try {

      const data = await apiUserInfoUpdate(params);
      
      // パスワード変更 firebaseで ここ
      await updatePassword({password: param.password, user})
      
      dispatchAppState({
        type: "SET_USER_INFO",
        payload: params,
      });
      alert("ユーザーデータを更新しました。");
  
    } catch (err) {
      console.log('useUpdateUserでエラー ' + err);
      

    }

  };
};
